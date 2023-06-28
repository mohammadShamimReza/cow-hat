'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const user_service_1 = require('./user.service');
const createUser = (0, catchAsync_1.default)(async (req, res) => {
  const userData = req.body;
  const result = await user_service_1.UserService.createUser(userData);
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});
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
  const result = await user_service_1.UserService.getSingleUser(req.params.id);
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
  const result = await user_service_1.UserService.updateUser(id, updatedData);
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
  const result = await user_service_1.UserService.deleteUser(id);
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_1.default.OK,
    success: true,
    message: 'User DELETED successfully',
    // meta: result.meta,
    data: result,
  });
});
exports.UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
