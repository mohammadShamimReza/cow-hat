import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controllar';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.get('/:id', UserController.getSingleUser);
router.get('/', UserController.getUsers);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export const UserRouter = router;
