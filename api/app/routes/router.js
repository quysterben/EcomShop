const express = require('express');

const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');

const serverRoute = express();

serverRoute.use('/auth', authRoute);
serverRoute.use('/user', userRoute);

module.exports = serverRoute;
