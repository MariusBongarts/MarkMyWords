import { UsersModule } from './../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkSchema } from './mark.schema';
import { MarksController } from './marks.controller';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mark', schema: MarkSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    UsersModule
  ],
  exports: [MarksService],
  providers: [MarksService],
  controllers: [MarksController]
})
export class MarksModule {}
