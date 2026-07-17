import { Router } from 'express';
import {
  getAdminOverview, getAdminUsers, updateUserRole, adjustWallet, deleteUser,
  getAdminOrders, updateOrderStatus, deleteOrder,
  getAdminTransactions, approveBankTransfer,
  getAdminSubscriptions,
  getAdminProducts, createProduct, updateProduct, deleteProduct,
  getAdminPlans, createPlan, updatePlan, deletePlan,
  getContactMessages, markMessageRead, deleteMessage,
  approveReview, deleteReview, getAllReviewsAdmin,
  getRevenueReport, broadcastNotification, seedServices, seedDemoData,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/overview', protect, admin, getAdminOverview);

router.get('/users', protect, admin, getAdminUsers);
router.patch('/users/:id/role', protect, admin, updateUserRole);
router.patch('/users/:id/wallet', protect, admin, adjustWallet);
router.delete('/users/:id', protect, admin, deleteUser);

router.get('/orders', protect, admin, getAdminOrders);
router.patch('/orders/:id/status', protect, admin, updateOrderStatus);
router.delete('/orders/:id', protect, admin, deleteOrder);

router.get('/transactions', protect, admin, getAdminTransactions);
router.patch('/transactions/:id/approve', protect, admin, approveBankTransfer);

router.get('/subscriptions', protect, admin, getAdminSubscriptions);

router.get('/products', protect, admin, getAdminProducts);
router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

router.get('/plans', protect, admin, getAdminPlans);
router.post('/plans', protect, admin, createPlan);
router.put('/plans/:id', protect, admin, updatePlan);
router.delete('/plans/:id', protect, admin, deletePlan);

router.get('/messages', protect, admin, getContactMessages);
router.patch('/messages/:id/read', protect, admin, markMessageRead);
router.delete('/messages/:id', protect, admin, deleteMessage);

router.get('/reviews', protect, admin, getAllReviewsAdmin);
router.patch('/reviews/:id/approve', protect, admin, approveReview);
router.delete('/reviews/:id', protect, admin, deleteReview);

router.get('/revenue', protect, admin, getRevenueReport);
router.post('/broadcast', protect, admin, broadcastNotification);
router.post('/seed/services', protect, admin, seedServices);
router.post('/seed/demo', protect, admin, seedDemoData);

export default router;
