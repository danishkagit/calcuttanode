import { Router } from 'express';
import { getLoyaltyInfo, redeemPoints } from '../controllers/loyaltyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/info', protect, getLoyaltyInfo);
router.post('/redeem', protect, redeemPoints);

export default router;
