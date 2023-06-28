'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const user_controllar_1 = require('./user.controllar');
const user_validation_1 = require('./user.validation');
const router = express_1.default.Router();
router.post(
  '/auth/signup',
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.createUserZodSchema
  ),
  user_controllar_1.UserController.createUser
);
router.get('/users/:id', user_controllar_1.UserController.getSingleUser);
router.get('/users', user_controllar_1.UserController.getUsers);
router.patch('/users/:id', user_controllar_1.UserController.updateUser);
router.delete('/users/:id', user_controllar_1.UserController.deleteUser);
exports.UserRouter = router;
