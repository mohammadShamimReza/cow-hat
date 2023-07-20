"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../../helper/jwtHelpers");
const auth = (...requiredRoles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        let varifiedUser = null;
        varifiedUser = jwtHelpers_1.jwtHelpers.varifyToken(token, config_1.default.jwt.secret);
        req.user = varifiedUser;
        if (requiredRoles.length && !requiredRoles.includes(varifiedUser.role)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'you are forbidden');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
