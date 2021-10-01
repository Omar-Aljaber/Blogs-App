const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');
const middleware = require('../middlewares/authMiddleware');

router.post('/', middleware.auhtenticated, controller.create);
router.get('/', controller.list);
router.get('/:id', controller.details);
router.put('/:id', middleware.auhtenticated, controller.update);
router.delete('/:id', middleware.auhtenticated, controller.delete);

module.exports = router;
