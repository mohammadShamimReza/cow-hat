"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const admin_model_1 = require("./admin.model");
const createAdmin = async (adminData) => {
    const result = await admin_model_1.Admin.create(adminData);
    return result;
};
const loginAdmin = async (LoginData) => {
    const { phoneNumber, password } = LoginData;
    const isAdminExist = await admin_model_1.Admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    if (isAdminExist.password &&
        !(await admin_model_1.Admin.isPasswordValid(password, isAdminExist?.password))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password not valid');
    }
    const { _id, role } = isAdminExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expire_in);
    return {
        accessToken,
        refreshToken,
    };
};
exports.adminService = { createAdmin, loginAdmin };
