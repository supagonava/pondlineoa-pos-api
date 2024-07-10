import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@/restaurant/entities/restaurant.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(lineId: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { line_id: lineId },
      relations: ['restaurants', 'owner_restaurants'],
    });
  }

  async signInByLine(userDto: CreateUserDto): Promise<any> {
    const existUser = await this.findOne(userDto.userId);
    if (existUser) return existUser;

    // Create User
    const user = new User();
    user.line_id = userDto.userId;
    user.is_admin = true;
    user.name = userDto.displayName;
    await this.usersRepository.save(user);

    // // Create Restaurant
    // const createdRestaurant = new Restaurant();
    // createdRestaurant.name = `Shop ของ ${user.name}`;
    // createdRestaurant.owner = user;
    // await this.restaurantRepository.save(createdRestaurant);

    return user;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
