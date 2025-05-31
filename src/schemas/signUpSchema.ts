import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(3, "username must be at least 3 characters")
  .max(30, "username must be less than 30 characters")
  .regex(/^[a-zA-Z0-9._-]+$/, "username can only contain letters, numbers, dots, underscores, and hyphens")
  .refine((val) => (val.match(/[a-zA-Z]/g) || []).length >= 2, {
    message: "username must contain at least two English letters"
  });

export const userSignUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(8, { message: "password must be at least 8 characters" })
});
