import { Restaurant } from '@/restaurant/entities/restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  line_id: string;

  @Column()
  is_admin: boolean;

  @ManyToMany(() => Restaurant, (r) => r.admins)
  restaurants: Restaurant[];

  @OneToMany(() => Restaurant, (r) => r.owner)
  owner_restaurants: Restaurant[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date;
}
