import Project, { IProject } from '../models/project.model';
import Client from '../models/client.model';
import { Types } from 'mongoose';

interface CreateProjectInput {
  clientId: Types.ObjectId;
  title: string;
  budget: number;
  deadline: Date;
  status: string;
}

export const createProject = async (data: CreateProjectInput): Promise<IProject> => {
  const { clientId, title, budget, deadline, status } = data;

  const client = await Client.findById(clientId);

  if (!client) {
    throw new Error('Client not found');
  }

  const newProject = new Project({
    client: client._id,
    title,
    budget,
    deadline,
    status,
  });

  return await newProject.save();
};
