const { validationResult } = require('express-validator');

const db = require('../models/index');
const { findById } = require('../models/user.model');

const productController = {
    createNewProduct: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error('Validation failed, entered data is incorrect!');
            err.statusCode = 422;
            err.data = errors.array();
            return next(err);
        }

        const vendor_id = req.userId;
        const product_name = req.body.product_name;
        const description = req.body.description;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const imageURLs = req.body.imageURLs;

        try {
            const newProduct = {
                vendor_id: vendor_id,
                product_name: product_name,
                description: description,
                quantity: quantity,
                price: price,
                imageURLs: imageURLs,
            };

            const result = await db.Product.create(newProduct);
            return res.status(200).json({
                success: true,
                message: 'Create new product success!',
                result: result,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    },
    getAllProducts: async (req, res, next) => {
        try {
            const data = await db.Product.find({});
            return res.status(200).json({
                success: true,
                message: 'Get all products success!',
                data: data,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    },
    getProductById: async (req, res, next) => {
        const productId = req.params.productId;

        try {
            const product = await db.Product.findById(productId);
            if (!product) {
                const err = new Error('No product found!');
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                success: true,
                message: 'Get product success!',
                data: product,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    },
    updateProduct: async (req, res, next) => {
        const productId = req.params.productId;

        const product_name = req.body.product_name;
        const description = req.body.description;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const imageURLs = req.body.imageURLs;

        try {
            const product = await db.Product.findById(productId);
            if (!product) {
                const err = new Error('No product found!');
                err.statusCode = 404;
                throw err;
            } else if (req.userId !== product.vendor_id) {
                const err = new Error('This is not your product!');
                err.statusCode = 400;
                throw err;
            }

            const newProduct = {
                product_name: product_name,
                description: description,
                quantity: quantity,
                price: price,
                imageURLs: imageURLs,
            };

            const updatedProduct = await db.Product.findByIdAndUpdate(productId, newProduct, { new: true });

            return res.status(200).json({
                success: true,
                message: 'Update product success!',
                updatedProduct: updatedProduct,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    },
    addProductToCart: async (req, res, next) => {},
};

module.exports = productController;
