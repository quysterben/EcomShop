const { body } = require('express-validator');

const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email!').normalizeEmail().notEmpty(),
    body('password').trim().isLength({ min: 8 }).notEmpty(),
];

module.exports = loginValidation;
