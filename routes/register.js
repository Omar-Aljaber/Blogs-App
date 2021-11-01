const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerController');
const middleware = require('../middlewares/authMiddleware');

/**
 * Register route
 */
router.post('/', middleware.guest, controller.register);

module.exports = router;
