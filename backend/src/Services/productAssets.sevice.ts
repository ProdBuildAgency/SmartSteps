import { prisma } from "../Configs/prisma";
import { ProductAssetStatusRequest } from "../DTO/Requests";
import { ProductAssets } from "../DTO/Responses";
import { Asset } from "../Enums";
import { AppError, S3Utils } from "../Utilities";

export class ProductAssetsService {
    static async upload(tx: any, productId: string, files: Express.Multer.File[], assetType?: string) {
        const assetsData: { id: string; url: string; asset_type: string }[] = [];

        for (const file of files) {
            const uploaded = await S3Utils.upload(file, `products/${productId}`);
            const saved = await tx.product_assets.create({
                data: {
                    product_id: productId,
                    url: uploaded.url,
                    s3_key: uploaded.key,
                    asset_type: assetType ? Asset[assetType as keyof typeof Asset] : Asset.IMAGE,
                },
                select: { id: true, file_url: true, asset_type: true },
            });

            assetsData.push({
                id: saved.id,
                url: saved.url,
                asset_type: saved.asset_type,
            });
        }

        return assetsData;
    }

    static async uploadAssets(productId: string, assets: Express.Multer.File[], asset_type: number): Promise<ProductAssets> {
        const product = await prisma.products.findUnique({ where: { id: productId } });
        if (!product) {
            throw new AppError("Product not found", 404);
        }

        const assetsData: ProductAssets["assets"] = [];

        for (const file of assets) {
            const uploaded = await S3Utils.upload(file, `products/${productId}`);
            console.log("uplloaded: ", uploaded, assetsData, typeof(Number(asset_type)))
            const saved = await prisma.product_assets.create({
                data: {
                    product_id: productId,
                    url: uploaded.url,
                    s3_key: uploaded.key,
                    asset_type: Number(asset_type),
                },
                select: { id: true, url: true, s3_key: true, asset_type: true },
            });

            assetsData.push({
                id: saved.id,
                url: saved.url,
                s3_key: saved.s3_key ?? uploaded.key,
                asset_type:
                    typeof saved.asset_type === "number"
                        ? Asset[saved.asset_type]
                        : "IMAGE",
            });
        }

        return {
            product_id: productId,
            assets: assetsData,
        };
    }

    static async get(productId: string | null): Promise<ProductAssets> {
        if (!productId) {
            throw new AppError("Product ID is required", 400);
        }

        const assets = await prisma.product_assets.findMany({
            where: { product_id: productId },
            select: { id: true, url: true, asset_type: true },
        });

        return {
            product_id: productId,
            assets: assets.map((a: any) => ({ id: a.id, url: a.url, s3_key: a.s3_key, asset_type: a.asset_type as Asset })),
        };
    }

    static async update(assetId: string, data: ProductAssetStatusRequest): Promise<ProductAssets> {
        const asset = await prisma.product_assets.update({
            where: { id: assetId },
            data: {
                asset_type: data.status
            },
        });

        return this.get(asset.product_id);
    }

    static async delete(assetId: string): Promise<void> {
        const asset = await prisma.product_assets.findUnique({
            where: { id: assetId },
        });

        if (!asset || !asset.s3_key) {
            throw new AppError("Asset not found", 404);
        }

        await S3Utils.delete(asset.s3_key);
        await prisma.product_assets.delete({ where: { id: assetId } });
    }
}