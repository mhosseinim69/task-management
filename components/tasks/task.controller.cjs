const TaskService = require("./task.service.cjs");

exports.create = async (req, res, next) => {
    const {
        title,
        status,
    } = req.body;
    const userId = req.user.user.id;

    try {
        const task = await TaskService.createTask(title, status, userId);
        return res.json(task);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    const {
        title,
        status,
    } = req.body;
    const userId = req.user.user.id;
    const taskId = req.params.id

    try {
        const task = await TaskService.updateTask(taskId, title, status, userId);
        return res.json(task);
    } catch (error) {
        next(error);
    }
};

exports.index = async (req, res, next) => {
    const userId = req.user.user.id;

    try {
        const tasks = await TaskService.getTasks(userId);
        return res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.read = async (req, res, next) => {
    const taskId = req.params.id
    const userId = req.user.user.id;
    try {
        const task = await TaskService.getTaskById(taskId, userId);
        return res.json(task);
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    const taskId = req.params.id
    const userId = req.user.user.id;

    try {
        await TaskService.deleteTask(taskId, userId);
        return res.json({
            msg: "Task was deleted."
        });
    } catch (error) {
        next(error);
    }
};