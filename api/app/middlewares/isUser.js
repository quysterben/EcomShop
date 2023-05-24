const isUser = async (req, res, next) => {
    try {
        if (req.role !== 1) {
            const err = new Error('You are not an user!');
            err.statusCode = 400;
            return next(err);
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    next();
};

module.exports = isUser;
