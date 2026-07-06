import { Router } from 'express';
import { validateCoupon, applyCoupon, createCoupon, getCoupons, getAllCoupons } from '../controllers/couponController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/validate', protect, validateCoupon);
router.post('/apply', protect, applyCoupon);
router.get('/', protect, getCoupons);
router.get('/all', protect, admin, getAllCoupons);
router.post('/', protect, admin, createCoupon);

export default router;
