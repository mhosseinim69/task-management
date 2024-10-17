const {
    body
} = require('express-validator');

module.exports.loginValidation = [
    body('email')
    .notEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

    body('password')
    .notEmpty().withMessage('Password cannot be empty')
    .isString().withMessage('Password must be a string')
    .trim(),
];