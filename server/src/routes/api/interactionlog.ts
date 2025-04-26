import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import { createInteractionLogController } from '../../controllers/interactionlog.controller';
import { InteractionLog } from '../../models';

const router = Router();

//create log
router.post(
  '/create-interactionlog',
  authenticateToken,
  authenticateToken,
  createInteractionLogController
);

//get logs both by client and project id
router.get(
  '/get-interactionLog/:clientId/:projectId',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId, projectId } = req.params;
      if (!clientId || !projectId) {
        res.status(400).json({ message: 'Both clientId and projectId are required' });
        return;
      }
      const logs = await InteractionLog.find({ client: clientId, project: projectId }).sort({
        date: -1,
      });
      res.status(200).json({ message: 'Interaction log fetched successfully', logs });
    } catch (error) {
      console.error('Error fetching logs:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
