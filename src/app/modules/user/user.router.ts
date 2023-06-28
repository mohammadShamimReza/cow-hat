import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controllar';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.get('/users/:id', UserController.getSingleUser);
router.get('/users', UserController.getUsers);
router.patch('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export const UserRouter = router;
