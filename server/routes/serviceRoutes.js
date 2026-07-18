import { Router } from 'express';
import { getServices, getTrendingServices, getServiceById, incrementTrending, incrementBooking } from '../controllers/serviceController.js';

const router = Router();

router.get('/', getServices);
router.get('/trending', getTrendingServices);
router.get('/:id', getServiceById);
router.patch('/:id/trending', incrementTrending);
router.patch('/:id/booking', incrementBooking);

export default router;
