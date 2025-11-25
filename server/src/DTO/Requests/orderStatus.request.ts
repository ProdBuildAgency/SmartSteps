import { z } from "zod";
import { OrderStatus } from "../../Enums";

export const OrderStatusSchema = z.object({
    status: z.nativeEnum(OrderStatus)
});

export type OrderStatusRequest = z.infer<typeof OrderStatusSchema>;
