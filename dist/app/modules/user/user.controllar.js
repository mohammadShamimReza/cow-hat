"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const getUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully',
        // meta: result.meta,
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.user;
    const result = await user_service_1.UserService.getSingleUser(req.params.id, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully',
        // meta: result.meta,
        data: result,
    });
});
const updateUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const token = req.user;
    const result = await user_service_1.UserService.updateUser(id, updatedData, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User updated successfully',
        // meta: result.meta,
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const token = req.user;
    const result = await user_service_1.UserService.deleteUser(id, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User DELETED successfully',
        // meta: result.meta,
        data: result,
    });
});
const getProfile = (0, catchAsync_1.default)(async (req, res) => {
    const accessToken = req.headers.authorization;
    const result = await user_service_1.UserService.getProfile(accessToken);
    // const result = accessToken;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's information retrived successfully",
        data: result,
    });
});
const updateProfile = (0, catchAsync_1.default)(async (req, res) => {
    const accessToken = req.headers.authorization;
    const userUpdateData = req.body;
    const result = await user_service_1.UserService.updateProfile(accessToken, userUpdateData);
    // const result = accessToken;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User's profile update successfully",
        data: result,
    });
});
exports.UserController = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    // profile
    getProfile,
    updateProfile,
};
