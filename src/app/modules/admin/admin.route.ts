import express from 'express';
import { AdminController } from './admin.controllar';

const router = express.Router();

router.post('/create-admin', AdminController.createAdmin);

export const AdminRoute = router;
