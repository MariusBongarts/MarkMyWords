import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthService {
    private usersService;
    private jwtService;
    private logger;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserByPassword(loginAttempt: LoginUserDto): Promise<unknown>;
    validateUserByJwt(payload: JwtPayload): Promise<{
        expiresIn: number;
        token: string;
    }>;
    createJwtPayload(user: any): {
        expiresIn: number;
        token: string;
    };
}
