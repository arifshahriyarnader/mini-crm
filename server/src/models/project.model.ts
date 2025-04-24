import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  client: Types.ObjectId;
  title: string;
  budget: number;
  deadline: Date;
  status: string;
}

const projectSchema = new Schema<IProject>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true }
);

// const Project = model<IProject>('Project', projectSchema);
// export default Project;
export default model<IProject>('Project', projectSchema);