"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const user_model_1 = require("./user.model");
const createUser = async (parems) => {
    const result = await user_model_1.User.create(parems);
    return result;
};
const getUsers = async () => {
    const result = await user_model_1.User.find({});
    return result;
};
const getSingleUser = async (id) => {
    const result = await user_model_1.User.find({ _id: id });
    return result;
};
const updateUser = async (id, updatedData) => {
    const ifExists = await user_model_1.User.findOne({ _id: id });
    if (!ifExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = await user_model_1.User.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
    });
    return result;
};
const deleteUser = async (id) => {
    const ifExists = await user_model_1.User.findOne({ _id: id });
    if (!ifExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = await user_model_1.User.findOneAndDelete({ _id: id });
    return result;
};
const getProfile = async (accessToekn) => {
    const accessInfo = jwtHelpers_1.jwtHelpers.varifyToken(accessToekn, config_1.default.jwt.secret);
    const { _id, role } = accessInfo;
    const result = await user_model_1.User.find({ _id, role }, { password: 0, _id: 0, createdAt: 0, updatedAt: 0 });
    return result;
};
const updateProfile = async (accessToekn, updateUserData) => {
    const accessInfo = jwtHelpers_1.jwtHelpers.varifyToken(accessToekn, config_1.default.jwt.secret);
    const { _id, role } = accessInfo;
    const result = await user_model_1.User.findOneAndUpdate({ _id, role }, updateUserData, {
        projection: {
            password: 0,
            _id: 0,
            createdAt: 0,
            updatedAt: 0,
        },
        new: true,
    });
    return result;
};
exports.UserService = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    //profile
    getProfile,
    updateProfile,
};
