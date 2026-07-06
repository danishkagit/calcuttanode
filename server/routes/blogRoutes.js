import { Router } from 'express';
import { getBlogs, getBlogBySlug, searchBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getBlogs);
router.get('/search', searchBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, admin, createBlog);
router.put('/:id', protect, admin, updateBlog);
router.delete('/:id', protect, admin, deleteBlog);

export default router;
