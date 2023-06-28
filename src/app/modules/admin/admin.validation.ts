import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({}),
});

export const AdminValidation = { createAdminZodSchema };
