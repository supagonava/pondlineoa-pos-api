import { OrderProductItem } from '@/order/entities/order.entity';
import { Restaurant } from '@/restaurant/entities/restaurant.entity';
import { StockType } from './stock-type.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => ProductOption, (po) => po.product)
  options: ProductOption[];

  @OneToMany(() => OrderProductItem, (opi) => opi.product)
  order_product_items: OrderProductItem[];

  @ManyToOne(() => Restaurant, (rs) => rs.menus)
  restaurant: Restaurant;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}

@Entity({ name: 'tb_product_options' })
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal' })
  additional_cost: number;

  @ManyToOne(() => Product, (p) => p.options)
  product: Product;

  @OneToMany(() => OrderProductItem, (opi) => opi.product_option)
  order_product_items: OrderProductItem[];

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  quantity: number;

  @Column()
  unit: string;

  @Column({ enum: StockType, default: StockType.PRODUCT })
  type: StockType;

  @Column({ type: 'decimal' })
  price: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
