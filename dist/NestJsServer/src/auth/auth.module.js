var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        imports: [
            PassportModule.register({ defaultStrategy: 'jwt', session: false }),
            JwtModule.registerAsync({
                imports: [ConfigModule],
                useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        secretOrPrivateKey: configService.get('JWT_KEY'),
                        signOptions: {
                            expiresIn: 360000
                        }
                    });
                }),
                inject: [ConfigService]
            }),
            UsersModule
        ],
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map