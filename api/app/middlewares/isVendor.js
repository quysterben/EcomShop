const isVendor = async (req, res, next) => {
    try {
        if (req.role !== 2) {
            const err = new Error('You are not a vendor!');
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

module.exports = isVendor;
