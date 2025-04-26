import { Router } from 'express';
import userRoutes from './user';
import clientRoutes from './client';
import projectRoutes from './project';
import interactionlogRoutes from './interactionlog';
import reminderRoutes from './reminder';

const router = Router();

router.use('/user', userRoutes);
router.use('/client', clientRoutes);
router.use('/project', projectRoutes);
router.use('/interactionlog', interactionlogRoutes);
router.use('/reminder', reminderRoutes)

export default router;
