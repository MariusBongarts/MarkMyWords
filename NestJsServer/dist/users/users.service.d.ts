import { ConfigService } from './../config/config.service';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    private configService;
    private logger;
    constructor(userModel: Model<User>, configService: ConfigService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findOneByEmail(email: any): Model<User>;
}
