import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// This route is just a placeholder. Real-time chat will be handled by Socket.io
router.get('/messages', authMiddleware, (req, res) => {
  res.json({ message: 'Chat messages will be handled by Socket.io' });
});

export default router;