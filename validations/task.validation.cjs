const {
    body
} = require('express-validator');

const createTaskValidation = [
    body('title')
    .notEmpty().withMessage('Title is required.')
    .isString().withMessage('Title must be a string.')
    .trim(),
    body('status')
    .notEmpty().withMessage('Status is required.')
    .isString().withMessage('Status must be a string.')
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be one of the following: pending, in-progress, completed.')
];

const updateTaskValidation = [
    body('title')
    .optional()
    .isString().withMessage('Title must be a string.')
    .trim(),
    body('status')
    .optional()
    .isString().withMessage('Status must be a string.')
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be one of the following: pending, in-progress, completed.')
];

module.exports = {
    createTaskValidation,
    updateTaskValidation,
};