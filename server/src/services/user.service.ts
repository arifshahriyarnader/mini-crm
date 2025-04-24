import User, { IUser } from '../models/user.model';
import { UserProfileResponse } from '../types/user';

// Get user profile
export async function getUserProfile(userId: string): Promise<UserProfileResponse> {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  updateData: Partial<IUser>
): Promise<UserProfileResponse> {
  const validUpdates = ['name', 'email', 'role'];
  Object.keys(updateData).forEach((key) => {
    if (!validUpdates.includes(key)) {
      throw new Error(`Invalid update field: ${key}`);
    }
  });

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    select: '-password',
  });

  if (!updatedUser) throw new Error('User not found');

  updatedUser.toObject();
  return {
    _id: updatedUser._id.toString(),
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  };
}

// Delete user profile
export async function deleteUserProfile(userId: string): Promise<void> {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) throw new Error('User not found');
}

// Get all users (admin only)
export async function getAllUsers(): Promise<UserProfileResponse[]> {
  const users = await User.find().select('-password');
  return users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  }));
}
