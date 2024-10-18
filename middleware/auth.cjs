const jwt = require('jsonwebtoken');
const Token = require('../components/token/token.model.cjs');

const auth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;

    if (!token) {
        return res.status(401).json({
            message: 'No token provided, authorization denied.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const validToken = await Token.findOne({
            token
        });

        if (!validToken) {
            return res.status(401).json({
                message: 'Invalid or revoked token'
            });
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Token is not valid.'
        });
    }
};

module.exports = auth;