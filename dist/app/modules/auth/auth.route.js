"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controllar_1 = require("./auth.controllar");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidation.loginZodSchema), auth_controllar_1.AuthController.loginUser);
router.post('/signup', (0, validateRequest_1.default)(auth_validation_1.UserValidation.createUserZodSchema), auth_controllar_1.AuthController.createUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.authValidation.refreshTokenZodSchema), auth_controllar_1.AuthController.refreshToken);
router.get('/', auth_controllar_1.AuthController.todo);
exports.AuthRoute = router;
