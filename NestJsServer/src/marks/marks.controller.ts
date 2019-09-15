import { Email } from './../users/decorators/email.decorator';
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('marks')
export class MarksController {

  constructor() {}

  /**
   * Returns all marks for logged user
   *
   * @param {*} email
   * @returns
   * @memberof MarksController
   */
  @Get('')
  @UseGuards(AuthGuard())
  async getMarks(@Email() email) {
      return {
          message: `Hello ${email}`
      }
  }
}
