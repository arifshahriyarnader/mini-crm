import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginRequestBody {
  type: 'email' | 'refresh';
  email?: string;
  password?: string;
  refreshToken?: string;
}

export interface TokenPayload {
  email: string;
  _id: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserProfileResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: string;
    [key: string]: any;
  };
  params: ParamsDictionary;
  body: any;
}

declare module 'express' {
  interface Request {
    user?: {
      _id: string;
      role: string;
      [key: string]: any;
    };
  }
}
