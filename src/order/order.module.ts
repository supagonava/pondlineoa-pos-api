import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderProductItem } from './entities/order.entity';
import { ProductModule } from '@/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProductItem]), ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
