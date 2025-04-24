import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { appConfig } from '../../config';
import { authenticateToken } from '../../middleware';
import User, { IUser } from '../../models/user.model';

const router = Router();

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

interface LoginRequestBody {
  type: 'email' | 'refresh';
  email?: string;
  password?: string;
  refreshToken?: string;
}

interface TokenPayload {
  email: string;
  _id: string;
  role: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    [key: string]: any;
  };
}

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
  ],
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await user.save();

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Server error', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

//login user
router.post(
  '/login',
  async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
    try {
      const { type, email, password, refreshToken } = req.body;
      if (type === 'email') {
        const user = await User.findOne({ email: email });
        if (!user) {
          res.status(500).json({ message: 'User not found' });
          return;
        }
        if (!email || !password) {
          res.status(400).json({ message: 'Email and password are required' });
          return;
        }
        await handleEmailLogin({ password, user, res });
      } else if (type === 'refresh') {
        if (!refreshToken) {
          res.status(401).json({ message: 'Refresh token not found' });
          return;
        } else {
          await handleRefreshToken({ refreshToken, res });
        }
      } else {
        res.status(400).json({ message: 'Invalid login type' });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

//user profile
router.get(
  '/user-profile',
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const id = req.user?._id;
      const user = await User.findById(id);
      if (user) {
        res.json(user);
        return;
      } else {
        res.status(500).json({ message: 'User not found' });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

//update user profile
router.put(
  '/:id',
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const userBody = req.body;
      const updateUser = await User.findByIdAndUpdate(id, userBody, {
        new: true,
      });
      if (updateUser) {
        res.status(200).json(updateUser);
        return;
      } else {
        res.status(404).json({ message: 'User not found' });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
);

export default router;

async function handleEmailLogin(params: {
  password: string;
  user: IUser;
  res: Response;
}): Promise<void> {
  const { password, user, res } = params;
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const userObj = await generateUserObject(user);
  res.json(userObj);
}

async function generateUserObject(user: IUser): Promise<UserResponse> {
  const { accessToken, refreshToken } = generateToken(user);
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

function generateToken(user: IUser): AuthTokens {
  if (!appConfig.AUTH.JWT_SECRET) {
    throw new Error('JWT secret is not configured');
  }

  const payload: TokenPayload = {
    email: user.email,
    _id: user._id.toString(),
    role: user.role,
  };

  const accessToken = jwt.sign(payload, appConfig.AUTH.JWT_SECRET, { expiresIn: '1d' });

  const refreshToken = jwt.sign(payload, appConfig.AUTH.JWT_SECRET, { expiresIn: '30d' });

  return { accessToken, refreshToken };
}

async function handleRefreshToken(params: { refreshToken: string; res: Response }): Promise<void> {
  const { refreshToken, res } = params;

  if (!appConfig.AUTH.JWT_SECRET) {
    res.status(500).json({ message: 'Server configuration error' });
    return;
  }

  jwt.verify(refreshToken, appConfig.AUTH.JWT_SECRET, async (err, payload) => {
    if (err || !payload) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    const typedPayload = payload as TokenPayload;
    const user = await User.findById(typedPayload._id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userObj = await generateUserObject(user);
    res.json(userObj);
  });
}
