'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const order_controllar_1 = require('./order.controllar');
const order_validate_1 = require('./order.validate');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequest_1.default)(
    order_validate_1.OrderValidation.makeOrderZodSchema
  ),
  order_controllar_1.OrderControllar.makeOrder
);
router.get('/', order_controllar_1.OrderControllar.getOrder);
exports.orderRoute = router;
