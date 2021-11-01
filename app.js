require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const commentsRouter = require('./routes/comments');

const app = express();

/**
 * Express Middleware's.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * routes
 */
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

/**
 * Errors Middlewares.
 */
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
    if (
        err.name === 'MongoError' ||
        err.name === 'ValidationError' ||
        err.name === 'CastError'
    ) {
        err.status = 422;
    }
    res.status(err.status || 500).json({
        message: err.message || 'some error occurred!',
    });
});

/**
 * Connect to mongodb
 */
mongoose.connect(process.env.DB_URL, (err) => {
    if (err) throw err;
    console.log('connection successfully');
});

module.exports = app;
