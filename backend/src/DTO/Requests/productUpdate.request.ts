import { z } from "zod";

export const productUpdateRequestSchema = z.object({
  title: z.string().min(3, "Title is required").optional(),
  description: z.string().min(3, "Description is required").optional(),
  category_id: z.string().optional(),
  price: z.number().min(2, "Price is required"),
  sku: z.string().optional(),
  currency: z.string().default("INR"),
  is_library_item: z.boolean().default(true),
});

export type ProductUpdateRequest = z.infer<typeof productUpdateRequestSchema>;
