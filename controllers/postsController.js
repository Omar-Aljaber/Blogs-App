const createError = require('http-errors');
const Post = require('../models/post');

/**
 * Create a Blog
 * @param req
 * @param res
 * @param next
 */
exports.create = (req, res, next) => {
    const data = {
        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
    };
    Post.create(data)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
};

/**
 * Find all Blogs
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    Post.find()
        .select('-comments')
        .populate('author', 'name')
        .then((posts) => {
            res.json(posts);
        })
        .catch(next);
};

/**
 * Show details from a Blog
 * @param req
 * @param res
 * @param next
 */
exports.details = (req, res, next) => {
    const id = req.params.id;
    Post.findById(id)
        .populate('author', 'name')
        .populate('comments.author', 'name')
        .then((post) => {
            if (!post) throw createError(404, 'Post not found');
            res.json(post);
        })
        .catch(next);
};

/**
 * Update a Blog
 * @param req
 * @param res
 * @param next
 */
exports.update = (req, res, next) => {
    const data = {
        title: req.body.title,
        content: req.body.content,
    };
    Post.findOneAndUpdate({ _id: req.params.id, author: req.user.id }, data, {
        runValidators: true,
    })
        .then((updated) => {
            if (!updated) throw createError(422);
            res.json(updated);
        })
        .catch(next);
};

/**
 * Delete a Blog
 * @param req
 * @param res
 * @param next
 */
exports.delete = (req, res, next) => {
    Post.findOneAndRemove({ _id: req.params.id, author: req.user.id })
        .then((deleted) => {
            if (!deleted) throw createError(404, 'Post not found');
            res.send({ message: 'Post deleted!' });
        })
        .catch(next);
};
