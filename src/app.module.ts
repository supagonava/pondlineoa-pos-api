import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { User } from './user/entities/user.entity';
import { Order, OrderProductItem } from './order/entities/order.entity';
import { Product, ProductOption } from './product/entities/product.entity';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import * as path from 'path';
import { AzureBlobService } from './azure-blob.service';
import { DatabaseSyncController } from './database-sync.controller';

const dbPath = path.join(path.dirname(__filename), '../database.sqlite');
export const ALL_ENTITIES = [
  User,
  Order,
  OrderProductItem,
  Product,
  ProductOption,
  Restaurant,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // ประเภทของฐานข้อมูล
      database: dbPath,
      entities: ALL_ENTITIES,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(ALL_ENTITIES),
    UserModule,
    RestaurantModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [AppController, DatabaseSyncController],
  providers: [AppService, AzureBlobService],
})
export class AppModule {}
