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

export default router;
