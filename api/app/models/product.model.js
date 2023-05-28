const mongoose = require('mongoose');

const Product = mongoose.model(
    'Product',
    new mongoose.Schema(
        {
            vendor_id: String,
            product_name: String,
            description: String,
            quantity: Number,
            price: Number,
            imageURLs: Array,
        },
        { timestamps: true },
    ),
);

module.exports = Product;
