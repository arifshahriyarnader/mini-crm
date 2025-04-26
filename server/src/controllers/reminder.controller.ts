import { Request, Response } from 'express';
import { createReminder, getRemindersDueThisWeek } from '../services/reminder.service';

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


export const getRemindersDueThisWeekController =   async (req: Request, res: Response): Promise<void> =>{
    try{
        const reminders=await getRemindersDueThisWeek();
        res.status(200).json({ message: 'Reminders due this week fetched successfully', reminders });
    }
    catch(error){
        console.error('Error fetching reminders for this week:', error);
        res.status(500).json({ message: 'Server error' });
    }
}