const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/user');

exports.register = (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    User.create(data)
        .then((user) => {
            const token = jwt.sign(
                { id: user._id, name: user.name, email: user.email },
                process.env.JWT_SECRET
            );
            res.json({ token: token, _id: user._id });
        })
        .catch((err) => {
            res.status(422).send({ message: 'Email is already exist!' });
        });
};
