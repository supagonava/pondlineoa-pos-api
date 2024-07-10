import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  Header,
  Headers,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Res() res: Response,
  ) {
    const response = await this.orderService.createOrder(createOrderDto);
    return res.status(HttpStatus.OK).json(response);
  }

  @Get()
  async findAll(
    @Query('restaurant_id') restaurantId: number,
    @Query('start_date') startDate: Date,
    @Query('end_date') endDate: Date,
    @Headers('line-id') lineId: string,
    @Res() res: Response,
  ) {
    const response = await this.orderService.findAll({
      restaurantId,
      startDate,
      endDate,
    });
    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.orderService.remove(id);
    return res.status(HttpStatus.ACCEPTED).send('ok');
  }
}
