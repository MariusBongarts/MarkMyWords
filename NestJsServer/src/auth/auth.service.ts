import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(private usersService: UsersService, private jwtService: JwtService) {

    }

    async validateUserByPassword(loginAttempt: LoginUserDto) {

        // This will be used for the initial login
        const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);

        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {

                if (err) {
                    this.logger.log(`Login of user ${loginAttempt.email} failed!`);
                    throw new UnauthorizedException(); }

                if (isMatch) {
                    // If there is a successful match, generate a JWT for the user
                    this.logger.log(`${loginAttempt.email} logged in successfully!`);
                    resolve(this.createJwtPayload(userToAttempt));

                } else {
                    this.logger.log(`Login of user ${loginAttempt.email} failed!`);
                    resolve(new UnauthorizedException());
                }

            });

        });

    }

    async validateUserByJwt(payload: JwtPayload) {

        // This will be used when the user has already logged in and has a JWT
        const user = await this.usersService.findOneByEmail(payload.email);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user) {

        const data: JwtPayload = {
            _id: user._id,
            email: user.email,
        };

        const jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt,
        };

    }

}
