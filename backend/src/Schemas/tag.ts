import z from "zod";
import { Tag } from "../Enums";

export const tagSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    status: z.nativeEnum(Tag),
});