import z from "zod";
import { OrderStatus } from "../Enums";

export const orderSchema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid().nullable(),

    deliveryAddressId: z.string().uuid().nullable(),
    total_price: z.number(),
    currency: z.string().length(3).optional(),
    status: z.nativeEnum(OrderStatus),
    payment_provider: z.string().nullable().optional(),
    payment_reference: z.string().nullable().optional(),
    delivery_estimate: z.any().nullable().optional(),
    created_at: z.date().nullable(),
    updated_at: z.date().nullable(),
});
