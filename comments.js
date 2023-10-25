// Create web server
// 1. Create web server
// 2. Create route for GET /comments
// 3. Create route for POST /comments
// 4. Create route for PUT /comments
// 5. Create route for DELETE /comments
// 6. Create route for GET /comments/:id
// 7. Create route for PUT /comments/:id
// 8. Create route for DELETE /comments/:id
// 9. Create route for GET /comments/:id/likes
// 10. Create route for POST /comments/:id/likes
// 11. Create route for DELETE /comments/:id/likes

const express = require('express');
const router = express.Router();
const db = require('../models');
const { Comment, User, Like } = db;

// 2. Create route for GET /comments
router.get('/', async (req, res) => {
  const comments = await Comment.findAll({ include: User });
  res.json(comments);
});

// 3. Create route for POST /comments
router.post('/', async (req, res) => {
  const { content, userId } = req.body;
  const comment = await Comment.create({ content, userId });
  res.json(comment);
});

// 4. Create route for PUT /comments
router.put('/', async (req, res) => {
  const { id, content } = req.body;
  const comment = await Comment.findByPk(id);
  comment.content = content;
  await comment.save();
  res.json(comment);
});

// 5. Create route for DELETE /comments
router.delete('/', async (req, res) => {
  const { id } = req.body;
  const comment = await Comment.findByPk(id);
  await comment.destroy();
  res.json(comment);
});

// 6. Create route for GET /comments/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id, { include: User });
  res.json(comment);
});

// 7. Create route for PUT /comments/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const comment = await Comment.findByPk(id);
  comment.content = content;
  await comment.save();
  res.json(comment);
});

//