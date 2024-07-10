import { Product } from '@/product/entities/product.entity';

// restaurant.interface.ts
export interface Restaurant {
  restaurantId: number;
  name: string;
  menus: Product[];
  addMenuItem(item: Product): void;
}
