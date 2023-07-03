"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: 'phoneNumber is required' }),
        role: zod_1.z.string({ required_error: 'role is required' }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'firstName is required' }),
            lastName: zod_1.z.string({ required_error: 'lastName is required' }),
        }, { required_error: 'lastName is required' }),
        address: zod_1.z.string({ required_error: 'address is required' }),
    }),
});
const AdminLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: 'phoneNumber is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
    }),
});
exports.AdminValidation = { createAdminZodSchema, AdminLoginZodSchema };
