import express from 'express';
import Sermon from '../models/Sermon.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const sermon = new Sermon({ title, content, type, author: req.body.author});
    await sermon.save();
    res.status(201).json(sermon);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create sermon', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const sermons = await Sermon.find().populate('author', 'name').sort('-createdAt');
    res.json(sermons);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch sermons', error: error.message });
  }
});

router.post('/:id/comments', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const sermon = await Sermon.findById(req.params.id);
    if (!sermon) {
      return res.status(404).json({ message: 'Sermon not found' });
    }
    sermon.comments.push({ user: req.user.id, text });
    await sermon.save();
    res.status(201).json(sermon);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add comment', error: error.message });
  }
});

export default router;