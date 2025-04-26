import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';

import { InteractionLog } from '../../models';

const router = Router();

router.post(
  '/create-interactionlog',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId, projectId, date, interactionType, notes } = req.body;
      if (!clientId || !projectId) {
        res.status(400).json({ message: 'Both clientId and projectId are required' });
        return;
      }

      if (!date || !interactionType || !notes) {
        res.status(400).json({ message: 'date, interactionType and notes are required' });
        return;
      }
      const newLog = new InteractionLog({
        client: clientId,
        project: projectId,
        date,
        interactionType,
        notes,
      });
      const savedLog = await newLog.save();
      res.status(201).json({ message: 'Interaction log created successfully', log: savedLog });
    } catch (error) {
      console.error('Error creating interaction log:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
