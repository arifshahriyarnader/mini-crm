import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import {
  createProjectController,
  getAllProjectsByClientIdController,
} from '../../controllers/project.controller';
import { Client, Project } from '../../models';

const router = Router();

// Create a new project
router.post('/create-project', authenticateToken, createProjectController);

//get all projects for a client by id
router.get('/get-all-projects/:clientId', authenticateToken, getAllProjectsByClientIdController);

//get all projects
router.get('/get-all-projects', authenticateToken, async (req: Request, res: Response) => {
  try {
    const clients = await Client.find({ user: req.user!._id }).select('_id');
    const clientIds = clients.map(client => client._id);
    const projects = await Project.find({ client: { $in: clientIds } }).populate('client');
    res.status(200).json({ message: 'Projects fetched successfully', projects });

  } catch (error) {
    console.error('Error fetching projects for user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
