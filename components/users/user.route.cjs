const auth = require("../../middleware/auth.cjs");
const userValidate = require("../../components/users/user.validation.cjs");
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

router.post("/users/register", userValidate.registerValidation, validate.check, register);
router.post("/users/login", userValidate.loginValidation, validate.check, login);
router.put("/users/:id", auth, userValidate.updateUserValidation, validate.check, update);
router.get("/users/", auth, index);
router.get("/users/:id", auth, read);
router.delete("/users/:id", auth, remove);

module.exports = router;