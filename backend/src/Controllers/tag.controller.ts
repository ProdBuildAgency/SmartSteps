import { Request, Response } from "express";
import { TagRequest, TagSchema, TagStatusSchema } from "../DTO/Requests";
import { AppError } from "../Utilities";
import { AuthenticatedRequest } from "../Middlewares";
import { TagService } from "../Services";
import { TagResponse } from "../DTO/Responses";

export class TagController {
    static async create(req: AuthenticatedRequest, res: Response) {
        const tagParsed = TagSchema.safeParse(req.body);
        if (!tagParsed.success) {
            throw new AppError("Some Data is missing.", 400, tagParsed.error.issues)
        }

        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }

        let finalData = tagParsed.data;
        const result = await TagService.create(finalData);
        return res.status(201).json(result);
    }

    static async getAll(req: Request, res: Response) {
        const tags: TagResponse[] = await TagService.getAll();
        return res.status(200).json(tags);
    }

    static async get(req: Request, res: Response) {
        const id = req.path.slice(1);
        const tag: TagResponse = await TagService.get(id);
        return res.status(200).json(tag);
    }

    static async update(req: AuthenticatedRequest, res: Response) {
        const id = req.path.slice(1);
        const data = req.body;
        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }
        const parsed = TagSchema.safeParse(req.body);

        if (!parsed.success) {
            throw new AppError("Invalid request body", 400, parsed.error.issues);
        }

        const requestData: TagRequest = parsed.data;
        const tag: TagResponse = await TagService.update(id, requestData);
        return res.status(201).json({
            message: 'Tag is updated',
            body: tag
        });
    }

    static async updateStatus(req: AuthenticatedRequest, res: Response) {
        const id = req.path.slice(1);
        const tagStatusParsed = TagStatusSchema.safeParse(req.body);
        if (!tagStatusParsed.success) {
            throw new AppError("Some Data is missing.", 400, tagStatusParsed.error.issues)
        }

        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }

        let finalData = tagStatusParsed.data;

        const tag: TagResponse = await TagService.updateStatus(id, finalData);
        return res.status(201).json({
            message: 'Tag status is changed',
            body: tag
        });
    }
}