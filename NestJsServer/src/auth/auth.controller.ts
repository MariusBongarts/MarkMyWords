import { Controller, Post, Body, Logger, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto'

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController');
    constructor(private authService: AuthService) {

    }

    @Post()
    async login(@Body() loginUserDto: LoginUserDto, @Req() req) {
        this.logger.log(`Login attempt of ${loginUserDto.email} from ${req.get('origin')}.`);
        return await this.authService.validateUserByPassword(loginUserDto);
    }

}