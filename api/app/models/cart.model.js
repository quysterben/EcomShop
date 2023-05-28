const mongoose = require('mongoose');

const Cart = mongoose.model(
    'Cart',
    new mongoose.Schema(
        {
            user_id: String,
            products: Array,
            quantities: Array,
            total: Number,
        },
        { timestamps: true },
    ),
);

module.exports = Cart;
