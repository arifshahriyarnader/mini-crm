import { Request, Response } from 'express';
import * as UserService from '../services/user.service';
import { AuthenticatedRequest } from '../types/user';
import { IUser } from '../models/user.model';

// Get user profile
export async function handleGetProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?._id;
    if (!userId) throw new Error('Unauthorized');

    const profile = await UserService.getUserProfile(userId);
    res.json(profile);
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}

// Update profile
export async function handleUpdateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const updateData: Partial<IUser> = {
      name: req.body.name,
      email: req.body.email,
    };

    const updatedUser = await UserService.updateUserProfile(userId, updateData);
    res.json(updatedUser);
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else {
      console.error('Update error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
// Delete profile
export async function handleDeleteProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    await UserService.deleteUserProfile(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else {
      console.error('Delete error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

// Get all users (admin)
export async function handleGetAllUsers(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
