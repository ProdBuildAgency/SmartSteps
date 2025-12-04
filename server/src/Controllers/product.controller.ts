import { Request, Response } from "express";
import { ProductRequest, productSchema, ProductStatusRequest, productStatusRequestSchema } from "../DTO/Requests";
import { AuthenticatedRequest } from "../Middlewares";
import { AppError } from "../Utilities";
import { ProductService } from "../Services";
import { ProductResponse } from "../DTO/Responses";
import { ProductFilterRequest } from "../DTO/Requests/productFilters.request";

export class ProductController {
    static async create(req: AuthenticatedRequest, res: Response) {
        const productParsed = productSchema.safeParse(req.body);
        if (!productParsed.success) {
            throw new AppError("Some Data is missing.", 400, productParsed.error.issues)
        }

        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }

        let finalData = productParsed.data;
        const result = await ProductService.create(finalData);
        return res.status(201).json(result);
    }

    static async getAll(req: Request, res: Response) {
        const filters: ProductFilterRequest = req.query;
        const products = await ProductService.getAll(filters);
        return res.status(200).json(products);
    }

    static async get(req: Request, res: Response) {
        const { id } = req.params;
        const product: ProductResponse = await ProductService.get(id);
        return res.status(200).json(product);
    }

    static async update(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;
        const data = req.body;
        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }
        const parsed = productSchema.safeParse(data);

        if (!parsed.success) {
            throw new AppError("Invalid request body", 400, parsed.error.issues);
        }

        const requestData: ProductRequest = parsed.data;
        const product: ProductResponse = await ProductService.update(id, requestData);
        return res.status(201).json({
            message: 'Product is updated',
            body: product
        });
    }

    static async updateStatus(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;
        const productStatusParsed = productStatusRequestSchema.safeParse(req.body);
        if (!productStatusParsed.success) {
            throw new AppError("Some Data is missing.", 400, productStatusParsed.error.issues)
        }

        if (!req.user || !req.user.id || !req.user.role) {
            throw new AppError("Unauthorized access", 401);
        }

        let finalData: ProductStatusRequest = productStatusParsed.data;

        const product: ProductResponse = await ProductService.updateStatus(id, finalData);
        return res.status(201).json({
            message: 'Product status is changed',
            body: product
        });
    }
}