
import Reminder,{IReminder} from '../models/reminder.model';

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