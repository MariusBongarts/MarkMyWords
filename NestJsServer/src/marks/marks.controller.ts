import { Client } from 'socket.io';
import { MarkGateway } from './mark.gateway';
import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { UsersService } from './../users/users.service';
import { Mark } from './mark.interface';
import { MarksService } from './marks.service';
import { UserJwt } from './../users/decorators/email.decorator';
import { Controller, Get, Post, Body, UseGuards, Req, Delete, Param, Put, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('marks')
export class MarksController {

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
  async getMarks(@UserJwt() userJwt) {
    const marks = await this.marksService.getMarksForUser(userJwt);
    return marks;
  }

  @Get('/url')
  @UseGuards(AuthGuard())
  async getMarksForUrl(@UserJwt() userJwt, @Query() query) {
    console.log(query.url);
    return await this.marksService.getMarksForUrl(userJwt as JwtPayload, query.url);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getMarkById(@UserJwt() userJwt, @Param('id') markId) {
    return await this.marksService.findMarkById(userJwt as JwtPayload, markId);
  }

  @Post('')
  @UseGuards(AuthGuard())
  async createMark(@UserJwt() userJwt, @Body() mark) {
    console.log(mark);
    const createdMark = await this.marksService.createMark(userJwt as JwtPayload, mark);
    return createdMark;
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteMark(@UserJwt() userJwt, @Param('id') markId) {
    const createdMark = await this.marksService.deleteMark(userJwt as JwtPayload, markId);
    return createdMark;
  }

  @Put('')
  @UseGuards(AuthGuard())
  async updateMark(@UserJwt() userJwt, @Body() mark) {
    return await this.marksService.updateMark(userJwt as JwtPayload, mark);
  }
}
