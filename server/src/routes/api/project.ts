import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import { createProjectController } from '../../controllers/project.controller';
import { Types } from 'mongoose';
import { Client, Project } from '../../models';

const router = Router();

// Create a new project
router.post('/create-project', authenticateToken, createProjectController);

//get all projects for a client by id
router.get(
  '/get-all-projects/:clientId',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId } = req.params;
      if (!Types.ObjectId.isValid(clientId)) {
        res.status(400).json({ message: 'Invalid clientId format' });
        return;
      }
      const client = await Client.findById({ _id: clientId, user: req.user!._id });
      if (!client) {
        res.status(403).json({ message: 'Client not found or unauthorized access' });
        return;
      }
      const projects = await Project.find({ client: clientId }).populate('client');
      res.status(200).json({ message: 'Projects fetched successfully', projects });
    } catch (error) {
      console.error('Error fetching all projects:', error);
      res.status(500).json({ error: 'server error' });
    }
  }
);

export default router;
