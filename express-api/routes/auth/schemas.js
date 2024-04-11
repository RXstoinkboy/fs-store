import * as z from "zod";

export const AuthSchema = z.object({
  body: z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(8).max(255),
  }),
});
