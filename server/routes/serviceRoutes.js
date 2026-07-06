import { Router } from 'express';
import { getServices, getServiceById, incrementTrending } from '../controllers/serviceController.js';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.patch('/:id/trending', incrementTrending);

export default router;
