import { create } from 'domain';
import { Request, Response } from 'express';
import {
  createInterActionLog,
  getInteractionLogsByClientAndProject,
} from '../services/interactionLog.service';

export const createInteractionLogController = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    const savedLog = await createInterActionLog({
      clientId,
      projectId,
      date,
      interactionType,
      notes,
    });
    res.status(201).json({ message: 'Interaction log created successfully', log: savedLog });
  } catch (error) {
    console.error('Error creating interaction log:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInteractionLogsByClientAndProjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { clientId, projectId } = req.params;
    const logs = await getInteractionLogsByClientAndProject(clientId, projectId);
    res.status(200).json({ message: 'Interaction log fetched successfully', logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
