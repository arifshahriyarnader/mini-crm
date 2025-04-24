import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { appConfig } from '../config';
import { AuthTokens, TokenPayload, UserResponse } from '../types/user';

export async function loginWithEmail(email: string, password: string): Promise<UserResponse> {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  return generateUserWithTokens(user);
}

export async function refreshAccessToken(refreshToken: string): Promise<UserResponse> {
  if (!appConfig.AUTH.JWT_SECRET) {
    throw new Error('Server configuration error');
  }

  const payload = jwt.verify(refreshToken, appConfig.AUTH.JWT_SECRET) as TokenPayload;
  const user = await User.findById(payload._id);
  
  if (!user) {
    throw new Error('User not found');
  }

  return generateUserWithTokens(user);
}

function generateUserWithTokens(user: IUser): UserResponse {
  const { accessToken, refreshToken } = generateTokens(user);
  const userObj = user.toObject() as Omit<IUser, 'password'>;

  return {
    ...userObj,
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken,
  };
}

function generateTokens(user: IUser): AuthTokens {
  if (!appConfig.AUTH.JWT_SECRET) {
    throw new Error('JWT secret is not configured');
  }

  const payload: TokenPayload = {
    email: user.email,
    _id: user._id.toString(),
    role: user.role,
  };

  return {
    accessToken: jwt.sign(payload, appConfig.AUTH.JWT_SECRET, { expiresIn: '1d' }),
    refreshToken: jwt.sign(payload, appConfig.AUTH.JWT_SECRET, { expiresIn: '30d' }),
  };
}