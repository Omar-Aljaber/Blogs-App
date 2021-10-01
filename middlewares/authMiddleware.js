const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.auhtenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) createError(401, 'You are Unauthorized');
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
        };
        next();
    });
};

exports.guest = (req, res, next) => {
    const token = req.headers['Authorization'];
    jwt.verify(token, process.env.JET_SECRET, (err) => {
        if (err) return next();
        createError(403);
    });
};
