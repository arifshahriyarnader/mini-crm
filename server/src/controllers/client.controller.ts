import { Request, Response } from "express";
import {createClient} from "../services/client.service";
import { Types } from "mongoose";

export const createClientController=async (req: Request, res: Response): Promise<void> => {
    try{
        const {name, email, phone, company, notes} = req.body;
        if(!name || !email || !phone){
             res.status(400).json({error: "name, email and phone are required"});
                return;
        }

        const client= await createClient({
            userId: new Types.ObjectId(req.user!._id),
            name,
            email,
            phone,
            company,
            notes,
        })
        res.status(201).json(client);

    }
    catch(error){
        console.error("Error creating client:", error);
        res.status(500).json({error: "server error"});
    }
}