const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerController');
const middleware = require('../middlewares/authMiddleware');

router.post('/', middleware.guest, controller.register);

module.exports = router;
