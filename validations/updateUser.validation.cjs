const {
    body
} = require('express-validator');

module.exports.updateUserValidation = [
    body('password')
    .optional()
    .isString().withMessage('Password must be a string')
    .isLength({
        min: 6
    }).withMessage('Password must be at least 6 characters long')
    .trim(),
];