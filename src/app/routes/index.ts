import express from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
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
  {
    path: '/admins',
    route: AdminRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
