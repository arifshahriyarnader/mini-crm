import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import { createProjectController } from '../../controllers/project.controller';

const router = Router();

// Create a new project
router.post('/create-project', authenticateToken, createProjectController);

export default router;
