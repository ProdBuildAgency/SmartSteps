import { z } from "zod";

export const deliveryAddressSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),

  fullName: z.string(),
  phone: z.string(),

  addressLine1: z.string(),
  addressLine2: z.string().optional(),

  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  country: z.string().default("India"),

  landmark: z.string().optional(),
  isDefault: z.boolean().default(false),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});
