import { Router } from 'express';
import { chat, chatStream, getModels } from '../controllers/aiController.js';

const router = Router();

router.post('/chat', chat);
router.post('/chat/stream', chatStream);
router.get('/models', getModels);

export default router;
