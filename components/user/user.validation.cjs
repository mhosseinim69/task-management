const {
    body
} = require('express-validator');

const registerValidation = [
    body('email')
    .notEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

    body('name')
    .notEmpty().withMessage('Name cannot be empty')
    .isString().withMessage('Name must be a string')
    .trim(),

    body('password')
    .notEmpty().withMessage('Password cannot be empty')
    .isString().withMessage('Password must be a string')
    .isLength({
        min: 6
    }).withMessage('Password must be at least 6 characters long')
    .trim(),
];

const loginValidation = [
    body('email')
    .notEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

    body('password')
    .notEmpty().withMessage('Password cannot be empty')
    .isString().withMessage('Password must be a string')
    .trim(),
];

const updateUserValidation = [
    body('password')
    .optional()
    .isString().withMessage('Password must be a string')
    .isLength({
        min: 6
    }).withMessage('Password must be at least 6 characters long')
    .trim(),
];

module.exports = {
    registerValidation,
    loginValidation,
    updateUserValidation
};