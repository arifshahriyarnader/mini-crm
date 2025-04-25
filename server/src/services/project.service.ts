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

export const getAllProjectsByClientId = async (clientId: string, userId: string) => {
  const client = await Client.findById({ _id: clientId, user: userId });
  if (!client) {
    throw new Error('Client not found or unauthorized access');
  }
  const projects = await Project.find({ client: clientId }).populate('client');
  return projects;
};

export const getAllProjectsForAllClients = async (userId: Types.ObjectId) => {
  const clients = await Client.find({ user: userId }).select('_id');
  const clientIds = clients.map((client) => client._id);
  const projects = await Project.find({ client: { $in: clientIds } }).populate('client');
  return projects;
};
