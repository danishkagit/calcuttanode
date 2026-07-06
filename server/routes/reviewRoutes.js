import { Router } from 'express';
import { createReview, getMyReviews, getServiceReviews, approveReview, getAllReviews } from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, createReview);
router.get('/my', protect, getMyReviews);
router.get('/service/:serviceId', getServiceReviews);
router.get('/all', protect, admin, getAllReviews);
router.patch('/:id/approve', protect, admin, approveReview);

export default router;
