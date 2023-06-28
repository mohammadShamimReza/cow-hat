'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CowRouter = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const cow_controllar_1 = require('./cow.controllar');
const cow_validation_1 = require('./cow.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequest_1.default)(
    cow_validation_1.cowValidation.createCowZodSchema
  ),
  cow_controllar_1.cowController.createCow
);
router.get('/', cow_controllar_1.cowController.getCows);
router.get('/:id', cow_controllar_1.cowController.getSingleCow);
router.patch('/:id', cow_controllar_1.cowController.updateSingleCow);
router.delete('/:id', cow_controllar_1.cowController.deleteCow);
exports.CowRouter = router;
