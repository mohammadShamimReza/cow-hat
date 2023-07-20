import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { cowController } from './cow.controllar';
import { cowValidation } from './cow.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(cowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  cowController.createCow
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  cowController.getCows
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  cowController.getSingleCow
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  cowController.updateSingleCow
);
router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), cowController.deleteCow);

export const CowRouter = router;
