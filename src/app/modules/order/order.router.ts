import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderControllar } from './order.controllar';
import { OrderValidation } from './order.validate';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.BUYER),
  validateRequest(OrderValidation.makeOrderZodSchema),
  OrderControllar.makeOrder
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderControllar.getOrder);

export const orderRoute = router;
