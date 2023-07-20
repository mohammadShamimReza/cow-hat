"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = exports.UserValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: 'phoneNumber is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
    }),
});
const roleType = ['buyer', 'seller'];
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: 'password is required' }),
        role: zod_1.z.enum([...roleType], {
            required_error: 'role is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'firstName is required' }),
            lastName: zod_1.z.string({ required_error: 'firstName is required' }),
        }, { required_error: 'Name is required' }),
        phoneNumber: zod_1.z.string({ required_error: 'phoneNumber is required' }),
        address: zod_1.z.string({ required_error: 'Address is required' }),
        budget: zod_1.z.number({ required_error: 'budget is required' }),
        income: zod_1.z.number({ required_error: 'income is required' }),
    }, { required_error: 'body is required' }),
});
exports.UserValidation = { createUserZodSchema };
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required',
        }),
    }),
});
exports.authValidation = {
    createUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
