const mongoose = require('mongoose');

const Payment = mongoose.model(
    'Payment',
    new mongoose.Schema(
        {
            user_id: String,
            products: Array,
            quantity: Number,
            total: Number,
        },
        { timestamps: true },
    ),
);

module.exports = Payment;
