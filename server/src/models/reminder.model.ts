import { Schema, Types, model, Document } from 'mongoose';

export interface IReminder extends Document {
  client?: Types.ObjectId;
  project?: Types.ObjectId;
  message: string;
  dueDate: Date;
}

const reminderSchema = new Schema<IReminder>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    message: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const Reminder = model<IReminder>('Reminder', reminderSchema);
// export default Reminder;
export default model<IReminder>('Reminder', reminderSchema);