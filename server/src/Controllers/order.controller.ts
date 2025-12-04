import { Request, Response } from "express";
import {
    OrderRequest,
    OrderSchema,
    OrderStatusRequest,
    OrderStatusSchema,
    OrderItemSchema,
    OrderItemRequest,
    OrderFilterRequest
} from "../DTO/Requests";

import { AppError } from "../Utilities";
import { OrderService } from "../Services";
import { AuthenticatedRequest } from "../Middlewares";
import { OrderResponse } from "../DTO/Responses";
import { Role } from "../Enums";

export class OrderController {

    static async create(req: AuthenticatedRequest, res: Response) {
        const orderParsed = OrderSchema.safeParse(req.body);
        const itemsParsed = OrderItemSchema.safeParse(req.body.items);

        if (!orderParsed.success) {
            throw new AppError("Some order data is missing.", 400, orderParsed.error.issues);
        }

        if (!itemsParsed.success) {
            throw new AppError("Invalid order items.", 400, itemsParsed.error.issues);
        }

        const orderData: OrderRequest = {
            ...orderParsed.data,
            user_id: req.user?.id
        };

        const itemsData: OrderItemRequest[] = itemsParsed.data;

        const order = await OrderService.create(orderData, itemsData);

        return res.status(201).json(order);
    }


    static async getAll(req: AuthenticatedRequest, res: Response) {
        const filters: OrderFilterRequest = req.query;
        if (!filters.user_ids && req.user?.id) {
            filters.user_ids = req.user.id;
        }
        const orders: OrderResponse[] = await OrderService.getAll(filters);
        return res.status(200).json(orders);
    }

    static async get(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;

        const order: OrderResponse = await OrderService.get(id);
        return res.status(200).json(order);
    }

    /**
     * Update order status
     * PATCH /orders/:id/status
     * (admin OR user cancel)
     */
    static async updateStatus(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;

        const orderParsed = OrderStatusSchema.safeParse(req.body);
        if (!orderParsed.success) {
            throw new AppError("Invalid request body", 400, orderParsed.error.issues);
        }

        if (!req.user?.id) {
            throw new AppError("Unauthorized access", 401);
        }

        const statusData: OrderStatusRequest = orderParsed.data;

        const updatedOrder: OrderResponse = await OrderService.updateStatus(
            id,
            statusData,
            req.user   // pass full user object for permission logic
        );

        return res.status(201).json({
            message: "Order status updated",
            body: updatedOrder
        });
    }
}
