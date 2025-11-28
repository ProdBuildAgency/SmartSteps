import { z } from "zod";

export const OrderItemSchema = z.object({
  order_id: z.string().uuid("Order ID is required").optional(),

  product_id: z.string().uuid("Product ID is required"),

  quantity: z.number().int("Quantity must be an integer").min(1, "Quantity must be at least 1").default(1),

  unit_price: z.number("Unit price is required",).int("Unit price must be an integer"),

  total_price: z.number("Total price is required",).int("Total price must be an integer"),
});

export type OrderItemRequest = z.infer<typeof OrderItemSchema>;
