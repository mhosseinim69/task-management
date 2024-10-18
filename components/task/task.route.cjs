const taskValidate = require("../../components/task/task.validation.cjs");
const validate = require("../../middleware/validate.cjs");
const policyCheck = require('../../middleware/policyCheck.cjs');
const Task = require('./task.model.cjs');
const {
    create,
    update,
    index,
    read,
    remove
} = require("./task.controller.cjs");

const router = require("express").Router();

router.post("/tasks", taskValidate.createTaskValidation, validate.check, create);

router.put("/tasks/:id", taskValidate.updateTaskValidation, validate.check, policyCheck('Task', 'update'), update);

router.get("/tasks", index);

router.get("/tasks/:id", policyCheck('Task', 'view'), read);

router.delete("/tasks/:id", policyCheck('Task', 'delete'), remove);

module.exports = router;