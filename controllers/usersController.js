const createError = require('http-errors');
const User = require('../models/user');

exports.create = (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    User.create(data)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
};

exports.list = (req, res, next) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch(next);
};

exports.fideOne = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
        .then((user) => {
            if (!user) throw createError(404, 'There is no User with this ID!');
            res.json(user);
        })
        .catch(next);
};

exports.update = (req, res, next) => {
    const id = req.params.id;
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    User.findByIdAndUpdate(id, data)
        .then((updated) => {
            if (!updated)
                throw createError(404, 'There is no User with this ID!');
            res.json(updated);
        })
        .catch(next);
};

exports.delete = (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndRemove(id)
        .then((deleted) => {
            if (!deleted)
                throw createError(404, 'There is no User with this ID!');
            res.send({ message: 'User deleted!' });
        })
        .catch(next);
};
