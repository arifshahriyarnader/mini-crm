import { Router, Request, Response } from 'express';
import { authenticateToken } from '../../middleware';
import {
  createClientController,
  getAllClientsController,
  getClientbyIdController,
  updateClientByIdController,
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
router.put('/client/:id', authenticateToken, updateClientByIdController);

//delete a client by id
router.delete(
  '/delete-client/:id',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const clientId = req.params.id;
      const userId = req.user!._id;
      const client = await Client.findByIdAndDelete({ _id: clientId, userId });
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }
      res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
      console.error('Error deleting client:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;
