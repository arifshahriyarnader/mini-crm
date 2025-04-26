import Reminder, { IReminder } from '../models/reminder.model';

interface CreateReminderInput {
  clientId?: string;
  projectId?: string;
  message: string;
  dueDate: Date;
}

export const createReminder = async (data: CreateReminderInput): Promise<IReminder> => {
  const { clientId, projectId, message, dueDate } = data;

  const newReminder = new Reminder({
    client: clientId,
    project: projectId,
    message,
    dueDate,
  });

  return await newReminder.save();
};


export const getRemindersDueThisWeek = async () => {
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
    return reminders;
};
