"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const user_model_1 = require("../user/user.model");
const loginUser = async (LoginData) => {
    const { phoneNumber, password } = LoginData;
    const isUserExist = await user_model_1.User.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (isUserExist.password &&
        !(await user_model_1.User.isPasswordValid(password, isUserExist?.password))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password not valid');
    }
    const { _id, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expire_in);
    return {
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (token) => {
    let varifiedToken = null;
    varifiedToken = jwtHelpers_1.jwtHelpers.varifyToken(token, config_1.default.jwt.refresh_secret);
    const { _id, role } = varifiedToken;
    const isUserExist = await user_model_1.User.findOne({ _id: _id });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new refresh token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ _id: _id, role: role }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    return {
        accessToken: newAccessToken,
    };
};
exports.authService = { loginUser, refreshToken };
