'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const user_model_1 = require('./user.model');
const createUser = async parems => {
  const result = await user_model_1.User.create(parems);
  return result;
};
const getUsers = async () => {
  const result = await user_model_1.User.find({});
  return result;
};
const getSingleUser = async id => {
  const result = await user_model_1.User.find({ _id: id });
  return result;
};
const updateUser = async (id, updatedData) => {
  const ifExists = await user_model_1.User.findOne({ _id: id });
  if (!ifExists) {
    throw new ApiError_1.default(
      http_status_1.default.NOT_FOUND,
      'User not found'
    );
  }
  const result = await user_model_1.User.findOneAndUpdate(
    { _id: id },
    updatedData,
    {
      new: true,
    }
  );
  return result;
};
const deleteUser = async id => {
  const ifExists = await user_model_1.User.findOne({ _id: id });
  if (!ifExists) {
    throw new ApiError_1.default(
      http_status_1.default.NOT_FOUND,
      'User not found'
    );
  }
  const result = await user_model_1.User.findOneAndDelete({ _id: id });
  return result;
};
exports.UserService = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
