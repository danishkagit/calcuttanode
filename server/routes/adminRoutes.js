import { Router } from 'express';
import {
  getAdminOverview, getAdminUsers, getAdminOrders, updateOrderStatus,
  getAdminTransactions, approveBankTransfer, getAdminSubscriptions, getRevenueReport,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/overview', protect, admin, getAdminOverview);
router.get('/users', protect, admin, getAdminUsers);
router.get('/orders', protect, admin, getAdminOrders);
router.patch('/orders/:id/status', protect, admin, updateOrderStatus);
router.get('/transactions', protect, admin, getAdminTransactions);
router.patch('/transactions/:id/approve', protect, admin, approveBankTransfer);
router.get('/subscriptions', protect, admin, getAdminSubscriptions);
router.get('/revenue', protect, admin, getRevenueReport);

export default router;
