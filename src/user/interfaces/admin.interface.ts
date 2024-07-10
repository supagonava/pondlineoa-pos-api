import { Restaurant } from '@/restaurant/entities/restaurant.entity';
import { Order } from '@/order/entities/order.entity';
import { User } from '../entities/user.entity';

// admin.interface.ts
export interface Admin extends User {
  adminId: number;
  restaurants: Restaurant[];
  generateQRCode(): void;
  assignUserAsAdmin(user: User): void;
  createOrder(order: Order): void;
}
