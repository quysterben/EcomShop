const { body } = require('express-validator');

const productValidation = [
    body('product_name').isLength({ min: 8 }).notEmpty(),
    body('description').isLength({ min: 8 }).notEmpty(),
    body('quantity').isNumeric().notEmpty(),
    body('price').isNumeric().notEmpty(),
];

module.exports = productValidation;
