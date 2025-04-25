import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';
import {
  createClientController,
  getAllClientsController,
  getClientbyIdController,
} from '../../controllers/client.controller';
import { Client } from '../../models';

const router = Router();

//create a new client
router.post('/create-client', authenticateToken, createClientController);

//get all clients
router.get('/all-clients', authenticateToken, getAllClientsController);

//get a client by id
router.get('/client/:id', authenticateToken, getClientbyIdController);

//update a client by id
router.put('/client/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = req.params.id;
    const userId = req.user!._id;
    const { name, email, phone, company, notes } = req.body;
    const client = await Client.findByIdAndUpdate(
      { _id: clientId, user: userId },
      { name, email, phone, company, notes },
      { new: true, runValidators: true }
    );
    if (!client) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
