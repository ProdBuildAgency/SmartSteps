import { z } from "zod";

export const OrderItemSchema = z.array(
  z.object({
    order_id: z.string().uuid("Order ID is required").optional(),
    product_id: z.string().uuid("Product ID is required"),
    quantity: z
      .number()
      .int("Quantity must be an integer")
      .min(1, "Quantity must be at least 1")
      .default(1),
    unit_price: z
      .number()
      .int("Unit price must be an integer"),
    total_price: z.number().int().optional() // optional now
  })
);

export type OrderItemRequest = z.infer<typeof OrderItemSchema>[number];
