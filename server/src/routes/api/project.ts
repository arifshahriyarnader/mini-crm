import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import {
  createProjectController,
  getAllProjectsByClientIdController,
  getAllProjectsForAllClientsController,
  updateProjectController,
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
router.put('/update-project/:id', authenticateToken, updateProjectController);

export default router;
