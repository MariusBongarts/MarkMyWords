import { Client } from 'socket.io';
import { MarkGateway } from './mark.gateway';
import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { UsersService } from './../users/users.service';
import { Mark } from './mark.interface';
import { MarksService } from './marks.service';
import { UserJwt } from './../users/decorators/email.decorator';
import { Controller, Get, Post, Body, UseGuards, Req, Delete, Param, Put, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from '@nestjs/common';

@Controller('marks')
export class MarksController {
  private logger = new Logger('MarksController');

  constructor(
    private marksService: MarksService,
    private usersService: UsersService) {
    }

  /**
   * Returns all marks for logged user
   *
   * @param {*} email
   * @returns
   * @memberof MarksController
   */
  @Get('')
  @UseGuards(AuthGuard())
  async getMarks(@UserJwt() userJwt: JwtPayload, @Req() req) {
    const marks = await this.marksService.getMarksForUser(userJwt);
    this.logger.log(`${userJwt.email} loaded ${marks.length} marks from ${req.get('origin')}.`);
    return marks;
  }

  @Get('/url')
  @UseGuards(AuthGuard())
  async getMarksForUrl(@UserJwt() userJwt: JwtPayload, @Query() query) {
    const marks = await this.marksService.getMarksForUrl(userJwt, query.url);
    this.logger.log(`${userJwt.email} loaded ${marks.length} marks from ${query.url}.`);
    return marks;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getMarkById(@UserJwt() userJwt: JwtPayload, @Param('id') markId, @Req() req) {
    const mark = await this.marksService.findMarkById(userJwt, markId);
    this.logger.log(`${userJwt.email} loaded mark ${mark.id} from ${req.get('origin')}.`);
    return mark;
  }

  @Post('')
  @UseGuards(AuthGuard())
  async createMark(@UserJwt() userJwt: JwtPayload, @Body() mark, @Req() req) {
    const createdMark = await this.marksService.createMark(userJwt, mark);
    this.logger.log(`${userJwt.email} created mark ${mark.id} from ${req.get('origin')}.`);
    return createdMark;
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteMark(@UserJwt() userJwt: JwtPayload, @Param('id') markId, @Req() req) {
    const deletedMark = await this.marksService.deleteMark(userJwt, markId);
    this.logger.log(`${userJwt.email} deleted mark ${markId} from ${req.get('origin')}.`);
    return deletedMark;
  }

  @Put('')
  @UseGuards(AuthGuard())
  async updateMark(@UserJwt() userJwt: JwtPayload, @Body() mark, @Req() req) {
    this.logger.log(`${userJwt.email} updated mark ${mark.id} from ${req.get('origin')}.`);
    return await this.marksService.updateMark(userJwt, mark);
  }
}
