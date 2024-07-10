export class CreateProductDto {
  type: string;
  restaurant: Restaurant;
  name: string;
  options: Option[];
}

export interface Option {
  id?: number;
  price: number;
  quantity: number;
  type: string;
  unit: string;
  additional_cost: number;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  created_at: Date;
  modified_at: Date;
}
