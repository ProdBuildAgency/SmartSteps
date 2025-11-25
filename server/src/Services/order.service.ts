import { prisma } from "../Configs/prisma";
import { AppError } from "../Utilities";
import {
    OrderRequest,
    OrderStatusRequest
} from "../DTO/Requests";
import { OrderResponse } from "../DTO/Responses";
import { OrderStatus, Role } from "../Enums";
import { OrderItemRequest } from "../DTO/Requests/orderItem.request";
import { OrderItemResponse } from "../DTO/Responses/orderItem.response";

export class OrderService {

    static async create(data: OrderRequest, items: OrderItemRequest[]): Promise<OrderResponse> {

        if (!data.user_id || !data.total_price) {
            throw new AppError("user id and price are required fields.", 400);
        }
        const result = await prisma.$transaction(async (tx: any) => {
            const totalPrice = items.reduce((sum, item) => sum + item.total_price, 0);
            const newOrder = await prisma.orders.create({
                data: {
                    user_id: data.user_id,
                    total_price: totalPrice,
                    currency: data.currency,
                    status: data.status,
                    payment_provider: data.payment_provider ?? "",
                    payment_reference: data.payment_reference,
                    shipping_address: data.shipping_address,
                    delivery_estimate: data.delivery_estimate,

                    order_items: {
                        create: items.map((item) => ({
                            product_id: item.product_id,
                            quantity: item.quantity,
                            unit_price: item.unit_price,
                            total_price: item.total_price,
                        })),
                    },
                },
                include: {
                    order_items: true
                }
            })

            const response: OrderResponse = {
                id: newOrder.id,
                user_id: newOrder.user_id,
                total_price: newOrder.total_price,
                currency: newOrder.currency ?? "",
                status: newOrder.status,
                payment_provider: newOrder.payment_provider,
                payment_reference: newOrder.payment_reference,
                shipping_address: newOrder.shipping_address,
                delivery_estimate: newOrder.delivery_estimate,
                created_at: newOrder.created_at,
                updated_at: newOrder.updated_at,
                order_items: newOrder.order_items
            }
            return response;
        })

        return result;
        
    }

    /**
     * Get all orders (with optional filters)
     */
    static async getAll(filter: any = {}): Promise<OrderResponse[]> {
        const orders = await prisma.orders.findMany({
            where: filter,
            orderBy: { created_at: "desc" }
        });

        const response: OrderResponse[] = [];

        for (const o of orders) {
            response.push(await this.get(o.id));
        }

        return response;
    }

    /**
     * Get order by ID with items
     */
     static async get(id: string): Promise<OrderResponse> {

        const order = await prisma.orders.findUnique({
            where: { id },
        });

        if (!order) {
            throw new AppError("Order not found!", 404);
        }

        const items = await prisma.order_items.findMany({
            where: { order_id: id },
            include: {
                products: {
                    include: {
                        product_assets: true
                    }
                }
            }
        });

        const itemResponses: OrderItemResponse[] = items.map((i) => ({
            id: i.id,
            order_id: i.order_id,
            product_id: i.product_id,
            quantity: i.quantity,
            unit_price: i.unit_price,
            total_price: i.total_price
        }));

        const response: OrderResponse = {
            id: order.id,
            user_id: order.user_id,
            total_price: order.total_price,
            currency: order.currency ?? "INR",
            status: order.status,
            payment_provider: order.payment_provider,
            payment_reference: order.payment_reference,
            shipping_address: order.shipping_address,
            delivery_estimate: order.delivery_estimate,
            created_at: order.created_at,
            updated_at: order.updated_at,
            order_items: itemResponses
        };

        return response;
    }

    /**
     * Update order status
     */
    static async updateStatus(
        id: string,
        data: OrderStatusRequest,
        user: { id: string; role: number }
    ): Promise<OrderResponse> {

        const order = await prisma.orders.findUnique({
            where: { id }
        });

        if (!order) {
            throw new AppError("Order not found!", 404);
        }

        // Non-admin users can only cancel their own orders
        if (user.role !== Role.ADMIN && order.user_id !== user.id) {
            throw new AppError("Unauthorized to update this order", 403);
        }

        // Only pending orders may be cancelled
        if (data.status === OrderStatus.CANCELLED && order.status !== OrderStatus.PENDING) {
            throw new AppError("You cannot cancel this order now", 400);
        }

        // Update
        const updated = await prisma.orders.update({
            where: { id },
            data: {
                status: data.status
            }
        });

        return this.get(updated.id);
    }
}
