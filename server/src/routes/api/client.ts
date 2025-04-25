import {Router, Request, Response} from 'express';
import {Client} from '../../models';
import { authenticateToken } from '../../middleware';

const router = Router();

//create a new client
router.post('/create-client', authenticateToken, async(req: Request, res: Response): Promise<void> => {
    try{
        const {name, email, phone, company, notes} = req.body;
        if(!name || !email || !phone){
             res.status(400).json({error: "name, email and phone are required"});
                return;
        }
        const newClient = new Client({
            user: req.user?._id,
            name,
            email,
            phone,
            company,
            notes
        })
        await newClient.save();
        res.status(201).json({message: "Client created successfully", client: newClient});

    } catch(error){
        console.error("Error creating client:", error);
        res.status(500).json({error: "server error"});
    }
})




export default router;