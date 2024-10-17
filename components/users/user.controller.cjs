const UserService = require("./user.service.cjs");

exports.register = async (req, res, next) => {
    const {
        email,
        name,
        password
    } = req.body;

    try {
        const user = await UserService.registerUser(email, name, password);
        return res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await UserService.loginUser(email, password);
        return res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    const {
        password
    } = req.body;
    const userId = req.params.id

    try {
        const user = await UserService.updateUser(userId, password);
        return res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.index = async (req, res, next) => {
    try {
        const users = await UserService.getUsers();
        return res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.read = async (req, res, next) => {
    const userId = req.params.id

    try {
        const user = await UserService.getUserById(userId);
        return res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    const userId = req.params.id
    try {
        await UserService.deleteUser(userId);
        return res.json({
            msg: "User was deleted."
        });
    } catch (error) {
        next(error);
    }
};