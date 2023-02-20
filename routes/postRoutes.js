const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /posts
// Get all posts
router.get('/', authMiddleware, postController.getAll);

// GET /posts/:id
// Get a post by ID
router.get('/:id', authMiddleware, postController.getById);

// POST /posts
// Create a new post
router.post('/', authMiddleware, postController.create);

// PUT /posts/:id
router.put('/:id', authMiddleware, postController.updateById);

// DELETE /posts/:id
router.delete('/:id', authMiddleware, postController.deleteById);

// GET /posts/top
router.get('/top', authMiddleware, postController.getTopPost);

module.exports = router;
