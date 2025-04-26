import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';
import {
  createReminderController,
  getRemindersDueThisWeekController,
} from '../../controllers/reminder.controller';

const router = Router();

//create reminder
router.post('/create-reminder', authenticateToken, createReminderController);

//get reminder due this week
router.get('/get-reminder/due-this-week', authenticateToken, getRemindersDueThisWeekController);

export default router;
