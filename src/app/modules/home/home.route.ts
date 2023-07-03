import express from 'express';
import { homeControllar } from './home.controllar';
const router = express.Router();

router.get('/', homeControllar.getHome);

export const HomeRouter = router;
