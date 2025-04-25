import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import {
  createProjectController,
  getAllProjectsByClientIdController,
  getAllProjectsForAllClientsController,
} from '../../controllers/project.controller';

const router = Router();

// Create a new project
router.post('/create-project', authenticateToken, createProjectController);

//get all projects for a client by id
router.get('/get-all-projects/:clientId', authenticateToken, getAllProjectsByClientIdController);

//get all projects
router.get('/get-all-projects', authenticateToken, getAllProjectsForAllClientsController);

export default router;
