var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    Module({
        imports: [
            MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
            PassportModule.register({ defaultStrategy: 'jwt', session: false })
        ],
        exports: [UsersService],
        controllers: [UsersController],
        providers: [UsersService]
    })
], UsersModule);
export { UsersModule };
//# sourceMappingURL=users.module.js.map