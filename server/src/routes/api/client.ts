import { Router } from 'express';
import { authenticateToken } from '../../middleware';
import {
  createClientController,
  deleteClientByIdController,
  getAllClientsController,
  getClientbyIdController,
  updateClientByIdController,
} from '../../controllers/client.controller';

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
router.delete('/delete-client/:id', authenticateToken, deleteClientByIdController);

export default router;
