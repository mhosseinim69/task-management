const path = require('path');
const validate = require("../components/task/task.model.cjs");

function policyCheck(modelName, action) {
    return async (req, res, next) => {
        try {
            const user = req.user.id;
            const modelId = req.params.id;

            const Model = require(path.join(__dirname, `../components/task/${modelName.toLowerCase()}.model.cjs`));
            const policy = require(path.join(__dirname, `../components/task/${modelName.toLowerCase()}.policy.cjs`));

            const modelInstance = modelId ? await Model.findById(modelId) : null;

            if (modelId && !modelInstance) {
                return res.status(404).json({
                    message: `${modelName} not found`
                });
            }

            if (!policy[action]) {
                return res.status(403).json({
                    message: 'Action not allowed'
                });
            }

            const isAuthorized = policy[action](user, modelInstance || {});

            if (!isAuthorized) {
                return res.status(403).json({
                    message: 'Forbidden'
                });
            }

            req.model = modelInstance;
            next();
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    };
}

module.exports = policyCheck;