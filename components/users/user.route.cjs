const auth = require("../../middleware/auth.cjs");
const registerValidate = require("../../validations/register.validation.cjs");
const loginValidate = require("../../validations/login.validation.cjs");
const updateValidate = require("../../validations/updateUser.validation.cjs");
const validate = require("../../middleware/validate.cjs");
const {
    register,
    login,
    update,
    index,
    read,
    remove
} = require("./user.controller.cjs");

const router = require("express").Router();

router.post("/users/register", registerValidate.registerValidation, validate.check, register);
router.post("/users/login", loginValidate.loginValidation, validate.check, login);
router.put("/users/:id", auth, updateValidate.updateUserValidation, validate.check, update);
router.get("/users/", auth, index);
router.get("/users/:id", auth, read);
router.delete("/users/:id", auth, remove);

module.exports = router;