'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const roleType = ['buyer', 'seller'];
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object(
    {
      password: zod_1.z.string({ required_error: 'password is required' }),
      role: zod_1.z.enum([...roleType], {
        required_error: 'role is required',
      }),
      name: zod_1.z.object(
        {
          firstName: zod_1.z.string({
            required_error: 'firstName is required',
          }),
          lastName: zod_1.z.string({ required_error: 'firstName is required' }),
        },
        { required_error: 'Name is required' }
      ),
      phoneNumber: zod_1.z.string({
        required_error: 'phoneNumber is required',
      }),
      address: zod_1.z.object(
        {
          division: zod_1.z.string({ required_error: 'division is required' }),
          district: zod_1.z.string({ required_error: 'district is required' }),
          area: zod_1.z.string({ required_error: 'area is required' }),
        },
        { required_error: 'Address is required' }
      ),
      budget: zod_1.z.number({ required_error: 'budget is required' }),
      income: zod_1.z.number({ required_error: 'income is required' }),
    },
    { required_error: 'body is required' }
  ),
});
exports.UserValidation = { createUserZodSchema };
