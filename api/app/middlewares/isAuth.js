const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    try {
        if (!authHeader) {
            const err = new Error('Not authenticated!');
            err.statusCode = 401;
            throw err;
        }

        const token = authHeader.split(' ')[1];
        let decodeToken;
        decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodeToken) {
            const err = new Error('Not authenticated!');
            err.statusCode = 401;
            throw err;
        }

        req.userId = decodeToken._id;
        req.role = decodeToken.role;
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    next();
};

module.exports = isAuth;
