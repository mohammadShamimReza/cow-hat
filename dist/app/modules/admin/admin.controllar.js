"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const admin_service_1 = require("./admin.service");
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const adminData = req.body;
    const result = await admin_service_1.adminService.createAdmin(adminData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Admin created successfully',
        data: result,
    });
});
const loginAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const LoginData = req.body;
    const result = await admin_service_1.adminService.loginAdmin(LoginData);
    const { accessToken, refreshToken } = result;
    const cookieOption = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOption);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Admin logged in successfully',
        data: {
            accessToken: accessToken,
        },
    });
});
exports.AdminController = { createAdmin, loginAdmin };
