import express from 'express';
import { CowRouter } from '../modules/cow/cow.router';
import { orderRoute } from '../modules/order/order.router';
import { UserRouter } from '../modules/user/user.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRouter,
  },
  {
    path: '/cows',
    route: CowRouter,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
