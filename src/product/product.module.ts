import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Product, ProductOption } from './entities/product.entity';
import { Restaurant } from '@/restaurant/entities/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, ProductOption, Restaurant]),
  ],
  exports: [
    TypeOrmModule.forFeature([User, Product, ProductOption, Restaurant]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
