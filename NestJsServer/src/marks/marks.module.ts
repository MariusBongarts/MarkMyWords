import { MarksController } from './marks.controller';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [MarksService],
  providers: [MarksService],
  controllers: [MarksController]
})
export class MarksModule {}
