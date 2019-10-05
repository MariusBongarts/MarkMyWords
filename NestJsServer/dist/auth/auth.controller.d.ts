import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
export declare class AuthController {
    private authService;
    private logger;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto, req: any): Promise<unknown>;
}
