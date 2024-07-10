import { OrderItem } from './order-item.interface';

// order.interface.ts
export interface Order {
  orderId: number;
  tableNumber: number;
  items: OrderItem[];
  totalPrice: number;
  addItem(item: OrderItem): void;
  finishOrder(): void;
}
