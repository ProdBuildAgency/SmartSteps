import { z } from "zod";
import { Tag } from "../../Enums";

export const TagStatusSchema = z.object({
  status: z.nativeEnum(Tag)
});

export type TagStatusRequest = z.infer<typeof TagStatusSchema>;