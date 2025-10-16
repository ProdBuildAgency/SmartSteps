import { Request, Response } from "express";
import { CategoryRequest, CategorySchema, CategoryStatusRequest, CategoryStatusRequestSchema } from "../DTO/Requests";
import { AppError } from "../Utilities";
import { CategoryService } from "../Services";
import { AuthenticatedRequest } from "../Middlewares";
import { CategoryResponse } from "../DTO/Responses";

export class CategoryController {
    static async create(req: AuthenticatedRequest, res: Response) {
        const categoryParsed = CategorySchema.safeParse(req.body);
        if (!categoryParsed.success) {
            throw new AppError("Some Data is missing.", 400, categoryParsed.error.issues)
        }

        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }

        let finalData = categoryParsed.data;
        const result = await CategoryService.create(finalData);
        return res.status(201).json(result);
    }

    static async getAll(req: Request, res: Response) {
        console.log("hii")
        const categories: CategoryResponse[] = await CategoryService.getAll();
        return res.status(200).json(categories);
    }

    static async get(req: Request, res: Response) {
        const id = req.path.slice(1);
        const category: CategoryResponse = await CategoryService.get(id);
        return res.status(200).json(category);
    }

    static async update(req: AuthenticatedRequest, res: Response) {
        const id = req.path.slice(1);
        const data = req.body;
        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }
        const parsed = CategorySchema.safeParse(data);

        if (!parsed.success) {
            throw new AppError("Invalid request body", 400, parsed.error.issues);
        }

        const requestData: CategoryRequest = parsed.data;
        const category: CategoryResponse = await CategoryService.update(id, requestData);
        return res.status(201).json({
            message: 'Category is updated',
            body: category
        });
    }

    static async updateStatus(req: AuthenticatedRequest, res: Response) {
        const id = req.path.slice(1);
        const categoryStatusParsed = CategoryStatusRequestSchema.safeParse(req.body);
        if (!categoryStatusParsed.success) {
            throw new AppError("Some Data is missing.", 400, categoryStatusParsed.error.issues)
        }

        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }

        let finalData: CategoryStatusRequest = categoryStatusParsed.data;

        const category: CategoryResponse = await CategoryService.updateStatus(id, finalData);
        return res.status(201).json({
            message: 'Category status is changed',
            body: category
        });
    }

}