import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { registerUser } from '../services/signup.service';
import { RegisterRequestBody } from '../types/user';

export async function handleRegister(
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const user = await registerUser(req.body);

    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error: any) {
    if (error.message === 'User already exists') {
      res.status(400).json({ message: error.message });
    } else {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}