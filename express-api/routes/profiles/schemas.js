import * as z from "zod";

export const ProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().min(1).max(255),
    street: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    state: z.string().min(1).max(255),
    zip: z.string().min(1).max(255),
    phone: z.string().min(1).max(255),
  }).partial(),
});
