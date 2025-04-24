import { Request, Response } from 'express';
import { LoginRequestBody } from '../types/user';
import * as AuthService from '../services/auth.service';

export async function handleLogin(
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> {
  try {
    const { type, email, password, refreshToken } = req.body;

    if (type === 'email') {
      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      const userWithTokens = await AuthService.loginWithEmail(email, password);
      res.json(userWithTokens);
    } else if (type === 'refresh') {
      if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token not found' });
        return;
      }

      const userWithTokens = await AuthService.refreshAccessToken(refreshToken);
      res.json(userWithTokens);
    } else {
      res.status(400).json({ message: 'Invalid login type' });
    }
  } catch (error: any) {
    switch (error.message) {
      case 'User not found':
        res.status(404).json({ message: error.message });
        break;
      case 'Invalid credentials':
        res.status(401).json({ message: error.message });
        break;
      case 'Server configuration error':
        res.status(500).json({ message: error.message });
        break;
      default:
        console.error('Login error:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
  }
}