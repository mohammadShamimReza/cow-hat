import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'phoneNumber is required' }),
    role: z.string({ required_error: 'role is required' }),
    name: z.object(
      {
        firstName: z.string({ required_error: 'firstName is required' }),
        lastName: z.string({ required_error: 'lastName is required' }),
      },
      { required_error: 'lastName is required' }
    ),
    address: z.string({ required_error: 'address is required' }),
  }),
});


const loginAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'phoneNumber is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const AdminValidation = { createAdminZodSchema, loginAdminZodSchema };
