import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import { createInteractionLogController } from '../../controllers/interactionlog.controller';

const router = Router();

router.post(
  '/create-interactionlog',
  authenticateToken, authenticateToken,createInteractionLogController);

export default router;
