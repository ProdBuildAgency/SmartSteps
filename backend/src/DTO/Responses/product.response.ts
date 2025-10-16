import { ProductStatus } from "../../Enums";

export interface ProductResponse {
    id: string;
    title: string;
    description?: string | null;
    price: number;
    currency: string | "INR",
    category: {
        id: string;
        name: string;
    } | null;
    status: ProductStatus | string ;
    is_library_item: boolean;
    sku?: string | null;
    tags?: { id: string; name: string }[];
    assets?: { id: string; url: string }[];
    createdAt: Date;
    updatedAt: Date;
}