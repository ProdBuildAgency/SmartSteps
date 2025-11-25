import { OrderStatus,  } from "../../Enums";
import { OrderItemResponse } from "./orderItem.response";


export interface OrderResponse {
  id: string;
  user_id: string | null;
  total_price: number;
  currency: string;
  status: number;

  payment_provider: string | null;
  payment_reference: string | null;

  shipping_address: any | null;
  delivery_estimate: any | null;

  created_at: string | Date | null;
  updated_at: string | Date | null;

  order_items: OrderItemResponse[];
}
