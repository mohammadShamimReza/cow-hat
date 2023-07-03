import express from 'express';
import { AdminRoute } from '../modules/admin/admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { CowRouter } from '../modules/cow/cow.router';
import { HomeRouter } from '../modules/home/home.route';
import { orderRoute } from '../modules/order/order.router';
import { UserRouter } from '../modules/user/user.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: HomeRouter,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
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
