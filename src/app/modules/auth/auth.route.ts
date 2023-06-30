import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controllar';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  AuthController.loginUser
);
