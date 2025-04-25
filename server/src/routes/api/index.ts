
import { Router } from 'express';
import userRoutes from './user';
import clientRoutes from './client';
import projectRoutes from './project';

const router = Router();

router.use('/user', userRoutes);
router.use('/client', clientRoutes)
router.use('/project', projectRoutes)

export default router;

