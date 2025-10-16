import { z } from "zod";
import { Category } from "../../Enums";

export const CategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 Character").optional(),
  slug: z.string().optional(),
  status: z.nativeEnum(Category).optional(),
  parent_category_id: z.string().optional()
});

export type CategoryRequest = z.infer<typeof CategorySchema>;