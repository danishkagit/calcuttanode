import { Router } from 'express';
import { getProducts, getProductBySlug, purchaseProduct, getMyPurchases, downloadProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/purchase', protect, purchaseProduct);
router.get('/my/purchases', protect, getMyPurchases);
router.get('/download/:token', protect, downloadProduct);

export default router;
