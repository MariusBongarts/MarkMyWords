import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { UsersService } from './../users/users.service';
import { Mark } from './mark.interface';
import { MarksService } from './marks.service';
import { UserJwt } from './../users/decorators/email.decorator';
import { Controller, Get, Post, Body, UseGuards, Req, Delete, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('marks')
export class MarksController {

  constructor(
    private marksService: MarksService,
    private usersService: UsersService) { }

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

  @Get(':id')
  @UseGuards(AuthGuard())
  async getMarkById(@UserJwt() userJwt, @Param('id') markId) {
    return await this.marksService.findMarkById(userJwt as JwtPayload, markId);
  }

  @Post('')
  @UseGuards(AuthGuard())
  async createMark(@UserJwt() userJwt, @Body() mark) {
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
