const mongoose = require('mongoose');

// role: 1-user 2-vendor 3-admin

// status:
//      1 - default
//      2 - pending

const User = mongoose.model(
    'User',
    new mongoose.Schema(
        {
            username: String,
            email: String,
            password: String,
            role: {
                type: Number,
                default: 1, //as user
            },
            status: {
                type: Boolean,
                default: false,
            },
        },
        { timestamps: true },
    ),
);

module.exports = User;
