import { Router, Request,Response } from 'express';
import { authenticateToken } from '../../middleware';
import { createReminderController } from '../../controllers/reminder.controller';
import { Reminder } from '../../models';

const router = Router();

//create reminder
router.post('/create-reminder', authenticateToken, createReminderController);

//get reminder due this week
router.get(
    '/get-reminder/due-this-week',
    authenticateToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const today = new Date();
        
        const endOfWeek = new Date();
        endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
  
        const reminders = await Reminder.find({
          dueDate: {
            $gte: today,
            $lte: endOfWeek,
          },
        }).sort({ dueDate: 1 });
  
        res.status(200).json({ message: 'Reminders due this week fetched successfully', reminders });
      } catch (error) {
        console.error('Error fetching reminders for this week:', error);
        res.status(500).json({ message: 'Server error' });
      }
    }
  );
  
export default router;
