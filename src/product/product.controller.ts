import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Res,
  HttpCode,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const createdResult = await this.productService.create(createProductDto);
    return res.status(HttpStatus.OK).json(createdResult);
  }

  @Get()
  async findAll(
    @Headers('line-id') lineId: string,
    @Query('restaurant_id') restaurant_id: number,
    @Res() res: Response,
  ) {
    const products = await this.productService.findAll({
      lineId,
      restaurant_id,
    });
    return res.status(HttpStatus.OK).json(products);
  }

  @Patch(':id')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    const response = await this.productService.update(id, updateProductDto);
    return res.status(HttpStatus.OK).json(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).json(await this.productService.remove(+id));
    return res;
  }
}
