import mongoose from 'mongoose';
import { appConfig } from './config';

const uri = appConfig.DB.MONGODB_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error', error);
    }
  }
};

export default connectDB;
