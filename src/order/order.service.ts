import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderProductItem } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { Product } from '@/product/entities/product.entity';
import { Restaurant } from '@/restaurant/entities/restaurant.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(OrderProductItem)
    private orderProductItemRepo: Repository<OrderProductItem>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Create order
    const orderCreated = new Order();
    const orderItems: OrderProductItem[] = [];
    orderCreated.restuarant = await this.restaurantRepo.findOneBy({
      id: createOrderDto.restuarant_id,
    });
    orderCreated.table_number = createOrderDto.tableNumber;
    orderCreated.total_price = 0;
    await this.orderRepo.save(orderCreated);

    // Create item in order
    for (const orderItem of createOrderDto.items) {
      const orderItemCreated = new OrderProductItem();
      orderItemCreated.product = await this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.options', 'options')
        .where('options.id = :id', { id: orderItem.productOptionId })
        .getOne();
      const productOption = orderItemCreated.product.options.find(
        (po) => po.id === orderItem.productOptionId,
      );

      orderItemCreated.quantity = orderItem.qty;
      orderItemCreated.product_option = productOption;
      orderItemCreated.order = orderCreated;
      await this.orderProductItemRepo.save(orderItemCreated);
      orderItems.push(orderItemCreated);

      orderCreated.total_price +=
        orderItemCreated.quantity * productOption.price;
    }
    return await this.orderRepo.save(orderCreated);
  }

  async findAll(args: {
    restaurantId: number;
    startDate: Date;
    endDate: Date;
  }): Promise<Order[]> {
    const records = await this.orderRepo
      .createQueryBuilder('orders')
      .leftJoin('orders.restuarant', 'restuarant')
      .leftJoinAndSelect('orders.order_product_items', 'order_product_items')
      .leftJoinAndSelect('order_product_items.product_option', 'product_option')
      .leftJoinAndSelect('order_product_items.product', 'product')
      .where(
        `restuarant.id = :restaurantId AND orders.created_at >= :startDate AND orders.created_at <= :endDate`,
        { ...args },
      )
      .getMany();
    return records;
  }

  async remove(id: number) {
    await this.orderProductItemRepo.softDelete({ order: { id: id } });
    await this.orderRepo.softDelete({ id: id });

    return true;
  }
}
