const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentsController');
const middleware = require('../middlewares/authMiddleware');

router.post('/:postId', middleware.auhtenticated, controller.create);

module.exports = router;
