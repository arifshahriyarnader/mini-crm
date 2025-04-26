import { Router } from 'express';
import userRoutes from './user';
import clientRoutes from './client';
import projectRoutes from './project';
import interactionlogRoutes from './interactionlog';

const router = Router();

router.use('/user', userRoutes);
router.use('/client', clientRoutes);
router.use('/project', projectRoutes);
router.use('/interactionlog', interactionlogRoutes);

export default router;
