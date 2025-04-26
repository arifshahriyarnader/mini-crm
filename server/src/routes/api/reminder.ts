import { Router } from 'express';
import { authenticateToken } from '../../middleware';
import { createReminderController } from '../../controllers/reminder.controller';

const router = Router();

router.post('/create-reminder', authenticateToken, createReminderController);

export default router;
