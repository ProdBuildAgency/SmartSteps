import { Tag } from "../../Enums";

export interface TagResponse {
    id: string,
    name: string,
    slug: string | null,
    status: Tag | string | null,
    createdAt: Date | null,
}