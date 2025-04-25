import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';
import Project, { IProject } from '../../models/project.model';
import Client, { IClient } from '../../models/client.model';

const router = Router();

// Create a new project
router.post(
  '/create-project',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, budget, deadline, status } = req.body;
      if (!title || !budget || !deadline || !status) {
        res.status(400).json({ message: 'Please fill all the fields' });
        return;
      }
      const client = await Client.findOne({ user: req.user!._id });
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }

      const newProject = new Project({
        client: client._id,
        title,
        budget,
        deadline,
        status,
      });
      const savedProject = await newProject.save();
      await savedProject.populate('client');
      res.status(201).json({ message: 'Project created successfully', project: savedProject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;
