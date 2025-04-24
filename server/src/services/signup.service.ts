import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { RegisterRequestBody, UserResponse } from '../types/user';
import { appConfig } from '../config'; 

function generateToken(user: IUser): { accessToken: string; refreshToken: string } {
  const payload = {
    email: user.email,
    _id: user._id.toString(),
    role: user.role,
  };

  const accessToken = jwt.sign(payload, appConfig.AUTH.JWT_SECRET, {
    expiresIn: '1d',
  });

  const refreshToken = jwt.sign(payload, appConfig.AUTH.JWT_SECRET, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
}

export async function registerUser(userData: RegisterRequestBody): Promise<UserResponse> {
  const { name, email, password, role } = userData;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();

  const { accessToken, refreshToken } = generateToken(user);

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken,
  };
}
