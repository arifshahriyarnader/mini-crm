import { Request, Response } from 'express';
import {
  createClient,
  deleteClientById,
  getAllClients,
  getClientbyId,
  updateClientById,
} from '../services/client.service';
import { Types } from 'mongoose';
import mongoose from 'mongoose';

export const createClientController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, company, notes } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ error: 'name, email and phone are required' });
      return;
    }

    const client = await createClient({
      userId: new Types.ObjectId(req.user!._id),
      name,
      email,
      phone,
      company,
      notes,
    });
    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'server error' });
  }
};

export const getAllClientsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const clients = await getAllClients(userId);
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'server error' });
  }
};

export const getClientbyIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = req.params.id;
    const userId = new mongoose.Types.ObjectId(req.user!._id);
    const client = await getClientbyId(clientId, userId);
    if (!client) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateClientByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = new Types.ObjectId(req.params.id);
    const userId = new Types.ObjectId(req.user!._id);
    const { name, email, phone, company, notes } = req.body;
    const client = await updateClientById(clientId, userId, {
      name,
      email,
      phone,
      company,
      notes,
    });
    if (!client) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'server error' });
  }
};


export const deleteClientByIdController=async (req: Request, res: Response): Promise<void> =>{
  try{
    const clientId = req.params.id;
      const userId = new Types.ObjectId(req.user!._id);
      const client =await deleteClientById(clientId, userId);

      if(!client){
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      res.status(200).json({ message: 'Client deleted successfully' });

  }
  catch(error){
    console.error('Error deleting client:', error);
      res.status(500).json({ error: 'Server error' });
  }
}