import z from "zod";
import { Category } from "../Enums";

export const categorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    status: z.nativeEnum(Category),
});