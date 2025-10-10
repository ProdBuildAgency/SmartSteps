import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string(),
  role: z.number().int().min(0).max(2)
});
