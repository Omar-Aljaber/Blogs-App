const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');
const middleware = require('../middlewares/authMiddleware');

/**
 * Login route
 */
router.post('/', middleware.guest, controller.login);

module.exports = router;
