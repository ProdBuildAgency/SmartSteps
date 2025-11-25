import { Request, Response } from "express";
import { 
    OrderRequest, 
    OrderSchema, 
    OrderStatusRequest, 
    OrderStatusSchema 
} from "../DTO/Requests";

import { AppError } from "../Utilities";
import { OrderService } from "../Services";
import { AuthenticatedRequest } from "../Middlewares";
import { OrderResponse } from "../DTO/Responses";
import { Role } from "../Enums";
import { OrderItemRequest, OrderItemSchema } from "../DTO/Requests/orderItem.request";

export class OrderController {

    /**
     * Create Order
     * POST /orders
     */
    static async create(req: AuthenticatedRequest, res: Response) {
        const orderParsed = OrderSchema.safeParse(req.body);
        const itemParsed = OrderItemSchema.safeParse(req.body);
        if (!orderParsed.success) {
            throw new AppError("Some data is missing.", 400, orderParsed.error.issues);
        }

        if (!req.user || !req.user.id) {
            throw new AppError("Unauthorized access", 401);
        }

        const orderData: OrderRequest = {
            ...orderParsed.data,
            user_id: req.user.id    // ensure order is created for logged-in user
        };
        const itemsData: OrderItemRequest = {
            ...itemParsed.data
        }

        const order = await OrderService.create(orderData, itemsData);
        return res.status(201).json(order);
    }

    /**
     * Get all orders
     * GET /orders?user_id=&status=
     */
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const { user_id, status } = req.query;

        // Admin can see all orders, user sees only his
        let filter: any = {};

        if (req.user?.role !== Role.ADMIN) {
            // Force user_id to be his own ID
            filter.user_id = req.user?.id;
        } else {
            // Admin side filtering allowed
            if (user_id) filter.user_id = user_id;
            if (status) filter.status = status;
        }

        const orders: OrderResponse[] = await OrderService.getAll(filter);
        return res.status(200).json(orders);
    }

    /**
     * Get order by ID
     * GET /orders/:id
     * (also returns order items)
     */
    static async get(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;

        const order: OrderResponse = await OrderService.get(id);

        // User cannot access others’ orders
        if (req.user?.role !== Role.ADMIN && order.user_id !== req.user?.id) {
            throw new AppError("Unauthorized access to this order", 403);
        }

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
