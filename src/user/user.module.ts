import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Restaurant } from '@/restaurant/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Restaurant])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
