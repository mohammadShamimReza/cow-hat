"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controllar_1 = require("./admin.controllar");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controllar_1.AdminController.createAdmin);
router.post('/login', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.AdminLoginZodSchema), admin_controllar_1.AdminController.loginAdmin);
exports.AdminRoute = router;
