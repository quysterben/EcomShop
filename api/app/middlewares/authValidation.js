const { body } = require('express-validator');

const authValidation = [
    body('email').isEmail().withMessage('Please enter a valid email!').normalizeEmail().notEmpty(),
    body('password').trim().isLength({ min: 8 }).notEmpty(),
    body('username').trim().isLength({ min: 6 }).notEmpty(),
];

module.exports = authValidation;
