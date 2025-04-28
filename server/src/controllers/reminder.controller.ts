import { Request, Response } from 'express';
import { createReminder, getRemindersDueThisWeek } from '../services/reminder.service';
import { Types } from 'mongoose';

export const createReminderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientId, projectId, message, dueDate } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID is required' });
      return;
    }

    if (!message || !dueDate) {
      res.status(400).json({ message: 'Message and Due date are required' });
      return;
    }
    const objectIdUserId = new Types.ObjectId(userId);
    const newReminder = await createReminder({
      userId: objectIdUserId,
      clientId,
      projectId,
      message,
      dueDate,
    });
    res.status(201).json({ message: 'Reminder created successfully', newReminder });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRemindersDueThisWeekController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found' });
      return;
    }
    const objectIdUserId = new Types.ObjectId(userId);
    const reminders = await getRemindersDueThisWeek(objectIdUserId);
    res.status(200).json({ message: 'Reminders due this week fetched successfully', reminders });
  } catch (error) {
    console.error('Error fetching reminders for this week:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
