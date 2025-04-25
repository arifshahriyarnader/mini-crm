
import { Router } from 'express';
import userRoutes from './user';
import clientRoutes from './client';

const router = Router();

router.use('/user', userRoutes);
router.use('/client', clientRoutes)

export default router;

