import Client, { IClient } from '../models/client.model';
import { Types } from 'mongoose';

interface createClientInput {
  userId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

export const createClient = async (data: createClientInput) => {
  const newClient = new Client({
    user: data.userId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    notes: data.notes,
  });
  return await newClient.save();
};
