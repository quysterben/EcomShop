const express = require('express');

const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const uploadRoute = require('./upload.routes');
const productRoute = require('./product.routes');

const serverRoute = express();

serverRoute.use('/auth', authRoute);
serverRoute.use('/user', userRoute);
serverRoute.use('/image', uploadRoute);
serverRoute.use('/product', productRoute);

module.exports = serverRoute;
