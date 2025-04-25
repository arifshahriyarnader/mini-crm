import { Request, Response } from 'express';
import {
  createProject,
  getAllProjectsByClientId,
  getAllProjectsForAllClients,
} from '../services/project.service';
import Client from '../models/client.model';
import { Types } from 'mongoose';

export const createProjectController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, budget, deadline, status, clientId } = req.body;

    if (!title || !budget || !deadline || !status || !clientId) {
      res.status(400).json({ message: 'Please fill all the fields including clientId' });
      return;
    }

    if (!Types.ObjectId.isValid(clientId)) {
      res.status(400).json({ message: 'Invalid clientId format' });
      return;
    }

    const validClientId = new Types.ObjectId(clientId as string);

    const client = await Client.findOne({ _id: validClientId, user: req.user!._id });

    if (!client) {
      res.status(403).json({ message: 'Invalid clientId or you do not own this client' });
      return;
    }

    const project = await createProject({
      clientId: validClientId,
      title,
      budget,
      deadline,
      status,
    });

    const populatedProject = await project.populate('client');

    res.status(201).json({ message: 'Project created successfully', project: populatedProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllProjectsByClientIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { clientId } = req.params;
    if (!Types.ObjectId.isValid(clientId)) {
      res.status(400).json({ message: 'Invalid clientId format' });
      return;
    }
    const projects = await getAllProjectsByClientId(clientId, req.user!._id);
    res.status(200).json({ message: 'Projects fetched successfully', projects });
  } catch (error) {
    console.error('Error fetching all projects:', error);
    res.status(500).json({ error: 'server error' });
  }
};

export const getAllProjectsForAllClientsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user!._id);
    const projects = await getAllProjectsForAllClients(userId);
    res.status(200).json({ message: 'Projects fetched successfully', projects });
  } catch (error) {
    console.error('Error fetching projects for user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
