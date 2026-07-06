import { Router } from 'express';
import { getWishlist, toggleWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getWishlist);
router.post('/toggle', protect, toggleWishlist);

export default router;
