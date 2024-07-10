import { Product, ProductOption } from '@/product/entities/product.entity';
import { Restaurant } from '@/restaurant/entities/restaurant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  table_number: string;

  @ManyToOne(() => Restaurant, (r) => r.orders)
  restuarant: Restaurant;

  @Column()
  total_price: number;

  @OneToMany(() => OrderProductItem, (opi) => opi.order)
  order_product_items: OrderProductItem[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}

@Entity({ name: 'tb_order_product_items' })
export class OrderProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (p) => p.order_product_items)
  product: Product;

  @ManyToOne(() => Order, (p) => p.order_product_items)
  order: Order;

  @ManyToOne(() => ProductOption, (po) => po.order_product_items)
  product_option: ProductOption;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  quantity: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
