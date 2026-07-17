import { Router } from 'express';
import { chat, chatStream, getModels, getUsage } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/chat', chat);
router.post('/chat/stream', chatStream);
router.get('/models', getModels);
router.get('/usage', protect, getUsage);

export default router;
