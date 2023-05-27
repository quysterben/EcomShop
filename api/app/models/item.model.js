const mongoose = require('mongoose');

const Item = mongoose.model(
    'Item',
    new mongoose.Schema(
        {
            vendor_id: String,
            name: String,
            description: String,
            quantity: Number,
            price: Number,
            rating: Number,
        },
        { timestamps: true },
    ),
);

module.exports = Item;
