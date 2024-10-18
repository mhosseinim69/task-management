const Task = require("./task.model.cjs");
const User = require("../user/user.model.cjs");

exports.createTask = async (title, status, userId) => {
    const user = await User.findById(userId);

    const task = new Task({
        title,
        status,
        user: userId,
    });

    const savedTask = await task.save();

    user.tasks.push(savedTask._id);
    await user.save();

    return savedTask;
};

exports.updateTask = async (taskId, title, status, userId) => {
    const task = await Task.findOne({
        _id: taskId,
        user: userId
    });
    if (!task) {
        const error = new Error('Task not found or you are not authorized');
        error.statusCode = 404;
        throw error;
    }

    if (title) {
        task.title = title;
    }
    if (status) {
        task.status = status;
    }

    const updatedTask = await task.save();

    return updatedTask;
};

exports.getTasks = async (userId, status, startDate, endDate, title) => {
    const query = {
        user: userId,
    };

    if (status) {
        query.status = status;
    }

    if (title) {
        query.title = {
            $regex: title,
            $options: 'i'
        };
    }

    if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) {
            query.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
            query.createdAt.$lte = new Date(endDate);
        }
    }

    const tasks = await Task.find(query)
        .populate('user', 'email username').lean();
    return tasks;
};

exports.getTaskById = async (taskId, userId) => {
    const task = await Task.findById(taskId)
        .populate('user', 'email username').lean();

    if (task.user._id.toString() !== userId) {
        const error = new Error('You do not have access to this user');
        error.statusCode = 403;
        throw error;
    }

    return task;
};

exports.deleteTask = async (taskId, userId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        const error = new Error('Task not found');
        error.statusCode = 404;
        throw error;
    }
    if (task.user._id.toString() !== userId) {
        const error = new Error('You do not have access to this task');
        error.statusCode = 403;
        throw error;
    }

    await Task.findByIdAndDelete(taskId);

    return {
        message: 'Task successfully deleted'
    };
};