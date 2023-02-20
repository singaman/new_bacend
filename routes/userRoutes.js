const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /users
router.get('/', userController.getAll);

// GET /users/:id
router.get('/:id', userController.getById);

// PUT /users/:id
router.put('/:id', authMiddleware, userController.updateById);

// DELETE /users/:id
router.delete('/:id', authMiddleware, userController.deleteById);

module.exports = router;
