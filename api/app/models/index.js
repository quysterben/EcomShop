const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require('./user.model');
db.Item = require('./item.model');
db.Cart = require('./cart.model');
db.Payment = require('./payment.model');

module.exports = db;
