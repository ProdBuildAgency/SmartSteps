export interface OrderItemResponse {
  id: string;
  order_id: string | null;
  product_id: string | null;
  quantity: number | null;
  unit_price: number;
  total_price: number;
}