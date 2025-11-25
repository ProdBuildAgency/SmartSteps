// import { z } from "zod";
// import { OrderStatus } from "../../Enums";

// export const OrderItemSchema = z.object({
//   product_id: z.string(),
//   qty: z.number().int().positive("Quantity must be at least 1"),
// });

// export const OrderSchema = z.object({
//   items: z.array(OrderItemSchema).min(1, "Order must contain at least one item"),
//   address: z.string().min(5, "Address must be at least 5 characters"),
//   delivery_estimate: z.string().optional(),  // optional: depends on system
//   payment_method: 1,
// });

//  title: z.string().min(3, "Title is required"),
//   description: z.string().min(3, "Description is required"),
//   category_id: z.string().optional(),
//   price: z.number().min(2, "Price is required"),
//   sku: z.string().optional(),
//   currency: z.string().default("INR"),
//   is_library_item: z.boolean().default(true),
//   status: z.nativeEnum(OrderStatus).optional(),
//   tags: z.array(z.string()).optional(),
//   assets: z.array(fileSchema).optional(),
//   assetTypes: z.nativeEnum(Asset).optional()

// export type OrderRequest = z.infer<typeof OrderSchema> & {
//   user_id: string;
// };

import { z } from "zod";
import { OrderStatus } from "../../Enums";

export const OrderSchema = z.object({
  user_id: z.string().uuid("User Id for Order is required").optional(),

  total_price: z.number("Total price is required",).int("Total price must be an integer"),

  currency: z.string().max(3).default("INR"),

  status: z.nativeEnum(OrderStatus, "Order status is required",),

  payment_provider: z.string().optional(),

  payment_reference: z.string().optional(),

  shipping_address: z.any().optional(), 

  delivery_estimate: z.any().optional(), 
});

export type OrderRequest = z.infer<typeof OrderSchema>;
