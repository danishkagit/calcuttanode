import { Router } from 'express';
import { getPlans, subscribe, getMySubscription, getMySubscriptionHistory, cancelSubscription, renewSubscription } from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/plans', getPlans);
router.post('/subscribe', protect, subscribe);
router.get('/my', protect, getMySubscription);
router.get('/my/history', protect, getMySubscriptionHistory);
router.post('/cancel', protect, cancelSubscription);
router.post('/renew', protect, renewSubscription);

export default router;
