// option.interface.ts
export interface Option {
  optionId: number;
  name: string;
  additionalCost: number;
}

// item.interface.ts
export interface Item {
  itemId: number;
  name: string;
  price: number;
  options: Option[];
}

// order-item.interface.ts
export interface OrderItem {
  orderItemId: number;
  item: Item;
  options: Option[];
  quantity: number;
}
