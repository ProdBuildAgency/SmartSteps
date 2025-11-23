import { z } from "zod";
import { Tag } from "../../Enums";

export const TagSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 Character").optional(),
  slug: z.string().optional(),
  status: z.nativeEnum(Tag).optional()
});

export type TagRequest = z.infer<typeof TagSchema>;