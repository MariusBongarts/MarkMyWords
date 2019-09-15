import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { User } from './../users/user.interface';
import { Mark } from './mark.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MarksService {
  constructor(@InjectModel('Mark') private markModel: Model<Mark>) { }

  async getMarksForUser(user: JwtPayload) {
    return await this.markModel.find({ _user: user._id }).exec();
  }

  async findMarkById(user: JwtPayload, markId: string) {
    return await this.markModel.findOne({ _user: user._id, _id: markId });
  }

  async createMark(user: JwtPayload, mark: Mark) {
    const createdMark = new this.markModel(mark);
    createdMark._user = user._id;
    return await createdMark.save();
  }

  async deleteMark(user: JwtPayload, markId: string) {
    return await this.markModel.deleteOne({ _user: user._id, _id: markId });
  }

  async updateMark(user: JwtPayload, mark: Mark) {
    return await this.markModel.updateOne({ _user: user._id, _id: mark._id }, mark);
  }
}
