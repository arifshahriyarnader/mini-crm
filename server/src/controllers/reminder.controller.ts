import { Request, Response } from 'express';
import { createReminder } from '../services/reminder.service';

export const createReminderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientId, projectId, message, dueDate } = req.body;
    if (!clientId && !projectId) {
      res.status(400).json({ message: 'Client ID or Project ID is required' });
      return;
    }
    const newReminder = await createReminder({ clientId, projectId, message, dueDate });
    res.status(201).json({ message: 'Reminder created successfully', newReminder });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
