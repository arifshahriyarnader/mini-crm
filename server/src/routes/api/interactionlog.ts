import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';
import {
  createInteractionLogController,
  getInteractionLogsByClientAndProjectController,
} from '../../controllers/interactionlog.controller';

const router = Router();

//create log
router.post(
  '/create-interactionlog',
  authenticateToken,
  authenticateToken,
  createInteractionLogController
);

//get logs both by clientId and projectId
router.get(
  '/get-interactionLog/:clientId/:projectId',
  authenticateToken,
  getInteractionLogsByClientAndProjectController
);

export default router;
