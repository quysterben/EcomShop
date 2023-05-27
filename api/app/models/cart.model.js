const mongoose = require('mongoose');

const Cart = mongoose.model(
    'Cart',
    new mongoose.Schema(
        {
            user_id: String,
            items: Array,
            quantities: Array,
            total_quantity: Number,
            total: Number,
        },
        { timestamps: true },
    ),
);

module.exports = Cart;
