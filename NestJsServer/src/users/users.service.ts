import { ConfigService } from './../config/config.service';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(@InjectModel('User') private userModel: Model<User>, private configService: ConfigService) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    this.logger.log(`Registration of new user ${createUserDto.email}!`);
    return await createdUser.save();

  }

  async findOneByEmail(email): Model<User> {
    return await this.userModel.findOne({email: email}) as User;
  }
}