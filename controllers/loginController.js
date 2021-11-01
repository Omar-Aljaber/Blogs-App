const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/user');

/**
 * Login
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    };
    User.findOne(data)
        .then((user) => {
            if (!user) throw createError(401, 'Incorrect Email or Password!');
            const token = jwt.sign(
                { id: user._id, name: user.name, email: user.email },
                process.env.JWT_SECRET
            );
            res.json({ token: token, _id: user._id });
        })
        .catch(next);
};
