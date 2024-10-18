module.exports = {
    view: (user, task) => {
        return user && user === task.user.toString();
    },
    update: (user, task) => {
        return user && user === task.user.toString();
    },
    delete: (user, task) => {
        return user && user === task.user.toString();
    },
};