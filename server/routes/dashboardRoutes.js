import { Router } from 'express';
import { getOverview, getOrders, getWallet, getTransactions, placeOrder } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/overview', protect, getOverview);
router.get('/orders', protect, getOrders);
router.get('/wallet', protect, getWallet);
router.get('/transactions', protect, getTransactions);
router.post('/order', protect, placeOrder);

export default router;
