import { Router } from 'express';
import { getReferralInfo, getReferralHistory } from '../controllers/referralController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/info', protect, getReferralInfo);
router.get('/history', protect, getReferralHistory);

export default router;
