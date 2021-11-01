const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const middleware = require('../middlewares/authMiddleware');

/**
 * User routes
 */
router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.fideOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
