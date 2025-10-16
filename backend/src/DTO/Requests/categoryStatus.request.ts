import { z } from "zod";
import { Category } from "../../Enums";

export const CategoryStatusRequestSchema = z.object({
    status: z.nativeEnum(Category)
});

export type CategoryStatusRequest = z.infer<typeof CategoryStatusRequestSchema>;