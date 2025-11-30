import { z } from "zod";
import { OrderStatus } from "../../Enums";

export const OrderSchema = z.object({
  user_id: z.string().uuid("User Id for Order is required").optional(),

  deliveryAddressId: z.string().uuid("Invalid delivery address ID").optional(),  

  total_price: z.number().int().optional(),

  currency: z.string().max(3).default("INR"),

  status: z.nativeEnum(OrderStatus, "Order status is required",),

  payment_provider: z.string().optional(),

  payment_reference: z.string().optional(),

  delivery_estimate: z.any().optional(), 
});

export type OrderRequest = z.infer<typeof OrderSchema>;
