import { z } from "zod";

export const productTagsRequestSchema = z.object({
  tag_ids: z.array(z.string(), "Tag ids should be an array."),
});

export type ProductTagsRequest = z.infer<typeof productTagsRequestSchema>;
