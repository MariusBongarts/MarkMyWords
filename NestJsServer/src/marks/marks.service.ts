import { MarkGateway } from './mark.gateway';
import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { User } from './../users/user.interface';
import { Mark } from './mark.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MarksService {
  constructor(
    @InjectModel('Mark') private markModel: Model<Mark>,
    private markGateway: MarkGateway
    ) { }

  async getMarksForUser(user: JwtPayload) {
    return await this.markModel.find({ _user: user._id }).exec();
  }

  async getMarksForUrl(user: JwtPayload, url: string) {
    console.log(url);
    return await this.markModel.find({ _user: user._id, url: url }).exec();
  }

  async findMarkById(user: JwtPayload, markId: string) {
    return await this.markModel.findOne({ _user: user._id, id: markId });
  }

  async createMark(user: JwtPayload, mark: Mark) {
    let createdMark = new this.markModel(mark);
    createdMark._user = user._id;
    this.markGateway.wss.emit('newMark', createdMark);
    return await createdMark.save();
  }

  async deleteMark(user: JwtPayload, markId: string) {
    return await this.markModel.deleteOne({ _user: user._id, id: markId });
  }

  async updateMark(user: JwtPayload, mark: Mark) {
    return await this.markModel.updateOne({ _user: user._id, id: mark.id }, mark);
  }
}
