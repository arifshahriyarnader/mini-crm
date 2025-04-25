import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import {
  createProjectController,
  getAllProjectsByClientIdController,
  getAllProjectsForAllClientsController,
} from '../../controllers/project.controller';
import { Types } from 'mongoose';
import { Client, Project } from '../../models';

const router = Router();

// Create a new project
router.post('/create-project', authenticateToken, createProjectController);

//get all projects for a client by id
router.get('/get-all-projects/:clientId', authenticateToken, getAllProjectsByClientIdController);

//get all projects
router.get('/get-all-projects', authenticateToken, getAllProjectsForAllClientsController);

//update a project by id
router.put(
  '/update-project/:id',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id: projectId } = req.params;
      const { title, budget, deadline, status } = req.body;

      if (!Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Invalid projectId format' });
        return;
      }

      const clients = await Client.find({ user: req.user!._id }).select('_id');
      const clientIds = clients.map((client) => client._id);

      const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId, client: { $in: clientIds } },
        {
          ...(title && { title }),
          ...(budget && { budget }),
          ...(deadline && { deadline }),
          ...(status && { status }),
        },
        { new: true }
      ).populate('client');

      if (!updatedProject) {
        res.status(404).json({ message: 'Project not found or unauthorized access' });
        return;
      }
      res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
