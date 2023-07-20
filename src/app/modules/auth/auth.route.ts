import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controllar';
import { UserValidation, authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.createUser
);
router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.get('/', AuthController.todo);

export const AuthRoute = router;
