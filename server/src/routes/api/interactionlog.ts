import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';
import {
  createInteractionLogController,
  getAllInteractionsController,
} from '../../controllers/interactionlog.controller';

const router = Router();

//create log
router.post('/create-interactionlog', authenticateToken, createInteractionLogController);

//get all logs
router.get('/get-all-interactionlogs/', authenticateToken, getAllInteractionsController);

export default router;
