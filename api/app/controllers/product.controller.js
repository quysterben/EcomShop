const db = require('../models/index');

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

        try {
            const newProduct = {
                vendor_id: vendor_id,
                product_name: product_name,
                description: description,
                quantity: quantity,
                price: price,
            };

            const result = db.Product.create(newProduct);
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
            const data = db.Product.find({});
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
    updateProduct: async (req, res, next) => {},
    addProductToCart: async (req, res, next) => {},
};

module.exports = productController;
