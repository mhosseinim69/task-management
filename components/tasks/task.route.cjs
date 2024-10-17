const taskValidate = require("../../validations/task.validation.cjs");
const validate = require("../../middleware/validate.cjs");
const {
    create,
    update,
    index,
    read,
    remove
} = require("./task.controller.cjs");

const router = require("express").Router();

router.post("/tasks", taskValidate.createTaskValidation, validate.check, create);
router.put("/tasks/:id", taskValidate.updateTaskValidation, validate.check, update);
router.get("/tasks", index);
router.get("/tasks/:id", read);
router.delete("/tasks/:id", remove);

module.exports = router;