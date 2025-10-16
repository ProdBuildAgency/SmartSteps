import { Decimal } from "@prisma/client/runtime/library";
import { Asset, ProductStatus } from "../../Enums";

export interface ProductResponse {
    id: string;
    title: string;
    description?: string | null;
    price: number | Decimal;
    currency: string | "INR" | null,
    category: {
        id: string;
        name: string;
    } | null;
    status: ProductStatus | string  | number | null;
    is_library_item: boolean | null ;
    sku?: string | null;
    tags?: { id: string; name: string }[];
    assets?: { id: string; url: string, asset_type: Asset | string }[];
    createdAt: Date | null;
    updatedAt: Date | null;
}