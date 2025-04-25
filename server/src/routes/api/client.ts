import { Router, Request, Response } from 'express';

import { authenticateToken } from '../../middleware';

import { createClientController } from '../../controllers/client.controller';

import { Client } from '../../models';

const router = Router();

//create a new client
router.post('/create-client', authenticateToken, createClientController);

//get all clients
router.get('/all-clients', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const clients = await Client.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
