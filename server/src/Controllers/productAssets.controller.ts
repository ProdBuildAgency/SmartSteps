import { Response } from "express";
import { AuthenticatedRequest } from "../Middlewares";
import { AppError } from "../Utilities";
import { ProductAssetsService } from "../Services";
import { productAssetStatusRequestSchema } from "../DTO/Requests";

export class ProductAssetsController {
    static async upload(req: AuthenticatedRequest, res: Response) {
        const { id: productId } = req.params;
        if (!productId) {
            throw new AppError("Product ID is required", 400);
        }

        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
            throw new AppError("No files uploaded", 400);
        }

        const { asset_type } = req.body;

        const result = await ProductAssetsService.uploadAssets(productId, files, asset_type);
        return res.status(201).json(result);
    }

    static async get(req: AuthenticatedRequest, res: Response) {
        const { id: productId } = req.params;
        if (!productId) {
            throw new AppError("Product ID is required", 400);
        }

        const result = await ProductAssetsService.get(productId);
        return res.status(200).json(result);
    }

    static async update(req: AuthenticatedRequest, res: Response) {
        const { asset_id: assetId } = req.params;
        if (!assetId) {
            throw new AppError("Asset ID is required", 400);
        }
        const parsed = productAssetStatusRequestSchema.safeParse(req.body);

        if (!parsed.success) {
            throw new AppError("Invalid request body", 400, parsed.error.issues);
        }

        const result = await ProductAssetsService.update(assetId, parsed.data);
        return res.status(200).json(result);
    }

    static async delete(req: AuthenticatedRequest, res: Response) {
        const { asset_id: assetId } = req.params;
        if (!assetId) {
            throw new AppError("Asset ID is required", 400);
        }

        await ProductAssetsService.delete(assetId);
        return res.status(200).json({ message: "Asset deleted successfully" });
    }
}