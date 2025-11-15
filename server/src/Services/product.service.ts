import { prisma } from "../Configs/prisma";
import { ProductRequest, ProductStatusRequest } from "../DTO/Requests";
import { ProductResponse } from "../DTO/Responses";
import { Asset, ProductStatus } from "../Enums";
import { AppError } from "../Utilities";
import { ProductAssetsService } from "./productAssets.sevice";
import { ProductTagsService } from "./productTags.service";

export class ProductService {
    static async create(data: ProductRequest): Promise<ProductResponse> {
        if (!data.title || !data.price) {
            throw new AppError("Title and price are required fields.", 400);
        }

        const result = await prisma.$transaction(async (tx: any) => {
            const product = await tx.products.create({
                data: {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    category_id: data.category_id ?? null,
                    sku: data.sku ?? null,
                    currency: data.currency ?? "INR",
                    is_library_item: data.is_library_item ?? true,
                    status: data.status ?? ProductStatus.DRAFT,
                },
            });

            let tagsData: { id: string; name: string }[] = [];
            if (data.tags && data.tags.length > 0) {
                tagsData = await ProductTagsService.link(tx, product.id, data.tags);
            }

            let assetsData: { id: string; url: string; asset_type: string }[] = [];
            if (data.assets && data.assets.length > 0) {
                assetsData = await ProductAssetsService.upload(tx, product.id, data.assets, data.assetTypes ? Asset[data.assetTypes] : "");
            }

            let categoryData: { id: string; name: string } | null = null;
            if (product.category_id) {
                const category = await tx.categories.findUnique({
                    where: { id: product.category_id },
                    select: { id: true, name: true },
                });
                categoryData = category;
            }

            const response: ProductResponse = {
                id: product.id,
                title: product.title,
                description: product.description ?? "",
                price: product.price,
                currency: product.currency,
                category: categoryData,
                status: product.status ? ProductStatus[product.status] : product.status,
                is_library_item: product.is_library_item,
                sku: product.sku,
                tags: tagsData,
                assets: assetsData,
                createdAt: product.created_at,
                updatedAt: product.updated_at,
            };

            return response;
        });

        return result;
    }

    static async getAll(): Promise<ProductResponse[]> {
        const products = await prisma.products.findMany({
            include: {
                categories: { select: { id: true, name: true } },
                product_tags: { include: { tags: true } },
                product_assets: { select: { id: true, url: true, asset_type: true } },
            },
        });
        const response: ProductResponse[] = products.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            currency: p.currency,
            category: p.categories,
            status: p.status ? ProductStatus[p.status] : null,
            is_library_item: p.is_library_item,
            sku: p.sku,
            tags: p.product_tags.map((pt) => pt.tags),
            assets: p.product_assets.map((pa) => ({ id: pa.id, url: pa.url, asset_type: pa.asset_type ? Asset[pa.asset_type] : 'IMAGE' })),
            createdAt: p.created_at,
            updatedAt: p.updated_at,
        }));
        return response;
    }

    static async get(id: string): Promise<ProductResponse> {
        const product = await prisma.products.findUnique({
            where: { id },
            include: {
                categories: { select: { id: true, name: true } },
                product_tags: { include: { tags: true } },
                product_assets: { select: { id: true, url: true, asset_type: true } },
            },
        });

        if (!product) {
            throw new AppError("Product doesn't exist!", 404);
        }

        const response: ProductResponse = {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            currency: product.currency,
            category: product.categories,
            status: product.status ? ProductStatus[product.status] : null,
            is_library_item: product.is_library_item,
            sku: product.sku,
            tags: product.product_tags.map((pt) => pt.tags),
            assets: product.product_assets.map((pa) => ({ id: pa.id, url: pa.url, asset_type: pa.asset_type ? Asset[pa.asset_type] : 'IMAGE' })),
            createdAt: product.created_at,
            updatedAt: product.updated_at,
        };
        return response;
    }

    static async update(id: string, data: ProductRequest): Promise<ProductResponse> {
        const product = await prisma.products.findUnique({
            where: { id }
        });

        if (!product) {
            throw new AppError("Product doesn't exist!", 404);
        }

        const updatedProduct = await prisma.products.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                currency: data.currency,
                category_id: data.category_id,
                is_library_item: data.is_library_item,
                sku: data.sku,
            },
        });

        return this.get(updatedProduct.id);
    }

    static async updateStatus(id: string, data: ProductStatusRequest): Promise<ProductResponse> {
        const product = await prisma.products.findUnique({
            where: { id }
        });

        if (!product) {
            throw new AppError("Product doesn't exist!", 404);
        }

        await prisma.products.update({
            where: { id },
            data: {
                status: data.status
            },
        });

        return this.get(id);
    }
}