import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../../middleware';
import { handleRegister } from '../../controllers/signup.controller';
import { handleLogin } from '../../controllers/auth.controller';
import { userController } from '../../controllers';

const router = Router();

//register user
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  handleRegister
);

//login user
router.post('/login', handleLogin);

// User profile routes
router.get('/user-profile', authenticateToken, userController.handleGetProfile);
router.put('/:id', authenticateToken, userController.handleUpdateProfile);
router.delete('/user-profile/:id', authenticateToken, userController.handleDeleteProfile);

// Admin-only routes
router.get('/', authenticateToken, userController.handleGetAllUsers);

export default router;
