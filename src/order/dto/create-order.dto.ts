export class CreateOrderDto {
  tableNumber: string;
  restuarant_id: number;
  items: { productOptionId: number; qty: number }[];
}
