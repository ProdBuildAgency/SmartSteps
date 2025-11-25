import { z } from "zod";

export const DeliveryAddressSchema = z.object({
  userId: z.string().uuid("Invalid user id"),

  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(10, "Phone number is required"),

  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),

  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(3, "Pincode is required"),

  country: z.string().default("India"),

  landmark: z.string().optional(),

  isDefault: z.boolean().optional().default(false),
});

export type DeliveryAddressRequest = z.infer<typeof DeliveryAddressSchema>;
