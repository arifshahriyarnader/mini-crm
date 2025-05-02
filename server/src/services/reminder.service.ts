import { Types } from 'mongoose';
import Reminder, { IReminder } from '../models/reminder.model';

interface CreateReminderInput {
  userId: Types.ObjectId;
  clientId?: Types.ObjectId;
  projectId?: Types.ObjectId;
  message: string;
  dueDate: Date;
}

export const createReminder = async (data: CreateReminderInput): Promise<IReminder> => {
  try {
    const { userId, clientId, projectId, message, dueDate } = data;
    const newReminder = new Reminder({
      user: userId,
      client: clientId,
      project: projectId,
      message,
      dueDate,
    });

    return await newReminder.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getRemindersDueThisWeek = async (userId: Types.ObjectId) => {
  const today = new Date();
  const endOfWeek = new Date();
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  const reminders = await Reminder.find({
    user: userId,
    dueDate: {
      $gte: today,
      $lte: endOfWeek,
    },
  }).populate("client", "name")
  .populate("project", "title")
  .sort({ dueDate: 1 });
  return reminders;
};
