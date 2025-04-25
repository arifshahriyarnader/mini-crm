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

export const getAllClients = async (userId: string) => {
  return await Client.find({ user: userId }).sort({ createdAt: -1 });
};

export const getClientbyId = async (clientId: string, userId: Types.ObjectId) => {
  return await Client.findById({ _id: clientId, user: userId });
};

export const updateClientById = async (
  clientId: Types.ObjectId,
  userId: Types.ObjectId,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    notes?: string;
  }
) => {
  const client = await Client.findByIdAndUpdate({ _id: clientId, user: userId }, data, {
    new: true,
    runValidators: true,
  });
  return client;
};


export const deleteClientById=async(clientId:string, userId:Types.ObjectId) =>{
  return await Client.findByIdAndDelete({ _id: clientId, userId });
}