const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require('./user.model');
db.Product = require('./product.model');
db.Cart = require('./cart.model');
db.Payment = require('./payment.model');

module.exports = db;
