import { Response } from "express";
import { productTagsRequestSchema } from "../DTO/Requests";
import { AuthenticatedRequest } from "../Middlewares";
import { ProductTagsService } from "../Services";
import { AppError } from "../Utilities";

export class ProductTagsController {
        static async link(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Product ID is required", 400);
        }
        const parsed = productTagsRequestSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new AppError("Invalid request body", 400, parsed.error.issues);
        }

        const result = await ProductTagsService.linkTags(id, parsed.data.tag_ids);
        return res.status(201).json({
            message: 'Tags linked successfully',
            body: result
        });
    }

    static async unlink(req: AuthenticatedRequest, res: Response) {
        const { id, tag_id } = req.params;
        if (!id || !tag_id) {
            throw new AppError("Product ID and Tag ID are required", 400);
        }

        const result = await ProductTagsService.unlink(id, tag_id);
        return res.status(200).json({
            message: 'Tag unlinked successfully',
            body: result
        });
    }
}