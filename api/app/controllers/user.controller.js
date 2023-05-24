const db = require('../models/index');

const userController = {
    getAll: async (req, res, next) => {
        try {
            const users = await db.User.find({}, '_id username email role');
            return res.status(200).json({
                success: true,
                message: 'Get all users success!',
                data: users,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    requestToVendor: async (req, res, next) => {
        try {
            const updateUser = await db.User.findOneAndUpdate({ _id: req.userId }, { status: true }).exec(
                (err, user) => {
                    if (err) {
                        next(err);
                    }

                    if (!user) {
                        const err = new Error('This user is not exist!');
                        err.statusCode = 400;
                        throw err;
                    } else if (user.status === true) {
                        const err = new Error('You have sent request to admin!');
                        err.statusCode = 400;
                        throw err;
                    }
                },
            );

            return res.status(200).json({
                success: true,
                message: 'Request sent success!',
                data: updateUser,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    },
    setVendor: async (req, res, next) => {
        const user = await db.User.findOneAndUpdate(
            { _id: req.body._id, role: 1, status: true },
            { role: 2, status: false },
        )
            .then((user) => {
                if (!user) {
                    const err = new Error('This user is not exist');
                    err.statusCode = 400;
                    throw err;
                }
                return res.status(200).json({
                    success: true,
                    message: 'Set vendor success!',
                    data: user,
                });
            })
            .catch((err) => {
                next(err);
            });
    },
};

module.exports = userController;
