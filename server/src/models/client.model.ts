import { Schema, model, Document, Types } from 'mongoose';

export interface IClient extends Document {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

const clientSchema = new Schema<IClient>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default model<IClient>('Client', clientSchema);
