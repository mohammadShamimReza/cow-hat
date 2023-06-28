import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cowController } from './cow.controllar';
import { cowValidation } from './cow.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(cowValidation.createCowZodSchema),
  cowController.createCow
);
router.get('/', cowController.getCows);
router.get('/:id', cowController.getSingleCow);
router.patch('/:id', cowController.updateSingleCow);
router.delete('/:id', cowController.deleteCow);

export const CowRouter = router;
