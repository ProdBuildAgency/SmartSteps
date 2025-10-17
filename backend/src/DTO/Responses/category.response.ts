import { Category } from "../../Enums";

export interface CategoryResponse {
    id: string,
    name: string,
    slug: string | string | null,
    status: Category | string | null,
    parent_category: CategoryResponse | null,
    createdAt: Date | null,
}