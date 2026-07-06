import { Router } from 'express';
import { createRazorpayOrder, verifyRazorpayPayment, createBankTransfer, approveBankTransfer, rejectBankTransfer } from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/razorpay/create-order', protect, createRazorpayOrder);
router.post('/razorpay/verify', protect, verifyRazorpayPayment);
router.post('/bank-transfer', protect, createBankTransfer);
router.put('/bank-transfer/:id/approve', protect, admin, approveBankTransfer);
router.put('/bank-transfer/:id/reject', protect, admin, rejectBankTransfer);

export default router;
