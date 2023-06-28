import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderControllar } from './order.controllar';
import { OrderValidation } from './order.validate';
const router = express.Router();

router.post(
  '/',
  validateRequest(OrderValidation.makeOrderZodSchema),
  OrderControllar.makeOrder
);

router.get('/', OrderControllar.getOrder);

export const orderRoute = router;
