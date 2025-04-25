import {Router, Request, Response} from 'express';

import { authenticateToken } from '../../middleware';

import { createClientController } from '../../controllers/client.controller';

const router = Router();

//create a new client
router.post('/create-client', authenticateToken,createClientController);




export default router;