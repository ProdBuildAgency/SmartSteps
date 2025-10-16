import { z } from "zod";
import { ProductStatus } from "../../Enums";
import { fileSchema } from "../../Schemas";

export const productRequestSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  category_id: z.string().optional(),
  price: z.number().min(2, "Price is required"),
  sku: z.string().optional(),
  currency: z.string().default("INR"),
  is_library_item: z.boolean().default(true),
  status: z.nativeEnum(ProductStatus).optional(),
  tags: z.array(z.string()).optional(),
  assets: z.array(fileSchema).optional()
});

export type ProductRequest = z.infer<typeof productRequestSchema>;
