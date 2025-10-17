import { Decimal } from "@prisma/client/runtime/library";

export interface ProductResponse {
    id: string;
    title: string;
    description?: string | null;
    price: number | Decimal;
    currency: string | null,
    category: {
        id: string;
        name: string;
    } | null;
    status:  string | null;
    is_library_item: boolean | null ;
    sku?: string | null;
    tags?: { id: string; name: string }[];
    assets?: { id: string; url: string, asset_type: string }[];
    createdAt: Date | null;
    updatedAt: Date | null;
}