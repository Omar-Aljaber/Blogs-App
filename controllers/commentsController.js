const mongoose = require('mongoose');
const createError = require('http-errors');
const Post = require('../models/post');

exports.create = (req, res, next) => {
    let data = {
        _id: mongoose.Types.ObjectId(),
        comment: req.body.content,
        author: req.user.id,
    };
    Post.findById(req.params.postId)
        .then((post) => {
            if (!post) throw createError(404);
            post.comments.push(data);
            return post.save();
        })
        .then((post) => {
            let comment = post.comments.id(data._id);
            res.json(comment);
        })
        .catch(next);
};
