import { Schema, model, Document, Types } from 'mongoose';

export interface IInteractionLog extends Document {
  client?: Types.ObjectId;
  project?: Types.ObjectId;
  date: Date;
  interactionType: 'call' | 'email' | 'meeting';
  notes: string;
}

const interactionLogSchema = new Schema<IInteractionLog>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    date: {
      type: Date,
      required: true,
    },
    interactionType: {
      type: String,
      enum: ['call', 'meeting', 'email'],
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const InteractionLog = model<IInteractionLog>('InteractionLog', interactionLogSchema);
// export default InteractionLog;
export default model<IInteractionLog>('InteractionLog', interactionLogSchema);