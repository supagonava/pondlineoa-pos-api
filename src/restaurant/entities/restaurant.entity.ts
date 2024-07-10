import { Order } from '@/order/entities/order.entity';
import { Product } from '@/product/entities/product.entity';
import { User } from '@/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (p) => p.restaurant)
  menus: Product[];

  @ManyToOne(() => User, (u) => u.owner_restaurants)
  owner: User;

  @ManyToMany(() => User, (u) => u.restaurants)
  @JoinTable({ name: 'fk_users_manage_restaurants' })
  admins: User;

  @OneToMany(() => Order, (o) => o.restuarant)
  orders: Order[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date;
}
