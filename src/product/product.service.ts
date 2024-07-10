import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductOption } from './entities/product.entity';
import { In, Not, Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { StockType } from './entities/stock-type.enum';
import { Restaurant } from '@/restaurant/entities/restaurant.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Restaurant)
    private restuarantRepo: Repository<Restaurant>,
    @InjectRepository(ProductOption)
    private productOptionRepo: Repository<ProductOption>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new Product();
    createdProduct.name = createProductDto.name;
    createdProduct.restaurant = await this.restuarantRepo.findOneBy({
      id: createProductDto.restaurant.id,
    });
    await this.productRepo.save(createdProduct);

    // options
    for (const option of createProductDto.options) {
      const createdItem = new ProductOption();
      createdItem.additional_cost = option.additional_cost;
      createdItem.name = option.name;
      createdItem.price = option.price;
      createdItem.quantity = option.quantity;
      createdItem.unit = option.unit;
      createdItem.product = createdProduct;
      await this.productOptionRepo.save(createdItem);
    }

    return this.productRepo.findOne({
      where: { id: createdProduct.id },
      relations: ['options'],
    });
  }

  async findAll({
    lineId,
    restaurant_id: restaurant_id,
  }: {
    lineId: string;
    restaurant_id: number;
  }): Promise<Product[]> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.restaurants', 'restaurants')
      .leftJoinAndSelect('user.owner_restaurants', 'owner_restaurants')
      .where('user.line_id = :lineId', { lineId })
      .andWhere(
        'restaurants.id = :restaurant_id OR owner_restaurants.id = :restaurant_id',
        {
          restaurant_id,
        },
      )
      .getOne();

    if (
      !user ||
      (user.restaurants?.length === 0 && user.owner_restaurants?.length === 0)
    ) {
      return [];
    }

    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.options', 'options')
      .leftJoinAndSelect('product.restaurant', 'restaurant')
      .where('restaurant.id = :restaurantId', {
        restaurantId: restaurant_id,
      })
      .andWhere('options.type =:product_type', {
        product_type: StockType.PRODUCT,
      })
      .getMany();

    return products;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productRepo.findOneBy({ id });
    updateProduct.name = updateProductDto.name;

    await this.productRepo.save(updateProduct);
    await this.productOptionRepo.softDelete({
      product: updateProduct,
      id: Not(
        In(updateProductDto.options.filter((i) => i.id).map((i) => i.id)),
      ),
    });

    // options
    for (const option of updateProductDto.options) {
      const updateItem =
        option.id && (await this.productOptionRepo.findOneBy({ id: option.id }))
          ? await this.productOptionRepo.findOneBy({ id: option.id })
          : new ProductOption();

      updateItem.additional_cost = option.additional_cost;
      updateItem.name = option.name;
      updateItem.price = option.price;
      updateItem.quantity = option.quantity;
      updateItem.unit = option.unit;
      updateItem.product = updateProduct;
      await this.productOptionRepo.save(updateItem);
    }

    return this.productRepo.findOne({
      where: { id: updateProduct.id },
      relations: ['options'],
    });
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    // remove options
    await this.productOptionRepo.softDelete({ product: { id: id } });
    await this.productRepo.softDelete(product);
    return product;
  }
}
