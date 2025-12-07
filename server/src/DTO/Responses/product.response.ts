 import { Prisma } from "@prisma/client";
export type Decimal = Prisma.Decimal;

export interface ProductResponse {
    id: string;
    title: string;
    description?: string | null;
    price: number | Decimal;
    alternate_price: number | Decimal | null;
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