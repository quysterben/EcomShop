const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const db = require('../models/index');

const authController = {
    signup: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error('Validation failed, entered data is incorrect!');
            err.statusCode = 422;
            err.data = errors.array();
            return next(err);
        }

        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        try {
            const user = await db.User.findOne({ email: email });
            if (user) {
                const err = new Error('Email is already exists!');
                err.statusCode = 401;
                throw err;
            }

            const hashedPw = await bcryptjs.hash(password, 12);
            const newUser = {
                username: username,
                email: email,
                password: hashedPw,
            };
            const result = await db.User.create(newUser);

            const newCart = {
                user_id: result._id,
                items: [],
                quantities: [],
                total_quantity: 0,
                total: 0,
            };
            const cart = await db.Cart.create(newCart);

            return res.status(201).json({ success: true, message: 'User created!', result: result });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    },
    signin: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error('Validation failed, entered data is incorrect!');
            err.statusCode = 422;
            err.data = errors.array();
            return next(err);
        }

        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await db.User.findOne({ email: email });
            if (!user) {
                const err = new Error('User does not exist!');
                err.statusCode = 401;
                throw err;
            }

            const isEqual = await bcryptjs.compare(password, user.password);
            if (!isEqual) {
                const err = new Error('Your password is not incorrect!');
                err.statusCode = 401;
                throw err;
            }

            const accessToken = createAccessToken({ _id: user._id, role: user.role });
            const refreshToken = createRefreshToken({
                _id: user._id,
                role: user.role,
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/api/v1/auth/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            return res.status(200).json({
                success: true,
                message: 'Login success!',
                data: {
                    token: accessToken,
                    user: user,
                },
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    logout: async (req, res, next) => {
        try {
            res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh_token' });
            return res.status(200).json({
                success: true,
                message: 'Logout success!',
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    generateAccessToken: async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                const err = new Error('You are not logged in!');
                err.statusCode = 400;
                throw err;
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, result) => {
                if (error) {
                    const err = new Error('Please Login or Register');
                    err.statusCode = 400;
                    throw err;
                }

                const user = await db.User.findOne({ _id: result._id });
                if (!user) {
                    return res.status(400).json({ success: false, message: 'This user is not exist!' });
                }

                const accessToken = createAccessToken({ _id: result._id, role: result.role });
                return res.status(200).json({
                    success: true,
                    message: 'Generate new access token success!',
                    data: {
                        token: accessToken,
                    },
                });
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = authController;
