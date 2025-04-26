import { Router, Request, Response } from 'express';
import { Reminder } from '../../models';
import { authenticateToken } from '../../middleware';

const router = Router();

router.post(
  '/create-reminder',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId, projectId, message, dueDate } = req.body;
      if (!clientId && !projectId) {
        res.status(400).json({ message: 'Client ID or Project ID is required' });
        return;
      }
      const newReminder = new Reminder({
        client: clientId,
        project: projectId,
        message,
        dueDate,
      });

      const savedReminder = await newReminder.save();
      res.status(201).json({ message: 'Reminder created successfully', reminder: savedReminder });
    } catch (error) {
      console.error('Error creating reminder:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
