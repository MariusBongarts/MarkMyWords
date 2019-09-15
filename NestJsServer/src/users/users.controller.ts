import { User } from './user.interface';
import { UserJwt } from './decorators/email.decorator';
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

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
    async testAuthRoute(@UserJwt() userJwt) {
        const user: User = await this.usersService.findOneByEmail(userJwt.email);
        console.log(user);
        return {
            message: `Hello ${user.email}`
        }
    }

}