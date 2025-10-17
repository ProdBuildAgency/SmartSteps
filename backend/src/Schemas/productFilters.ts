import { z } from "zod";
import { ProductStatus } from "../Enums";

export const productFilter = z.object({
    category: z.string().optional(),
    tag: z.string().optional(),
    search: z.string().optional(),
    status: z.nativeEnum(ProductStatus).optional()
});