import { Schema, Types, model, Document } from 'mongoose';

export interface IReminder extends Document {
  user: Types.ObjectId;
  client?: Types.ObjectId;
  project?: Types.ObjectId;
  message: string;
  dueDate: Date;
}

const reminderSchema = new Schema<IReminder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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

export default model<IReminder>('Reminder', reminderSchema);
