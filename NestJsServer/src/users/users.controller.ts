import { User } from './user.interface';
import { Email } from './decorators/email.decorator';
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from './../config/config.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService) {

    }

    @Post('/register')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    // This route will require successfully passing our default auth strategy (JWT) in order
    // to access the route
    @Get('test')
    @UseGuards(AuthGuard())
    async testAuthRoute(@Email() email) {
        const user: User = await this.usersService.findOneByEmail(email);
        return {
            message: `Hello ${user.email}`
        }
    }

}