import { MarkGateway } from './mark.gateway';
import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { Mark } from './mark.interface';
import { Model } from 'mongoose';
export declare class MarksService {
    private markModel;
    private markGateway;
    constructor(markModel: Model<Mark>, markGateway: MarkGateway);
    getMarksForUser(user: JwtPayload): Promise<any>;
    getMarksForUrl(user: JwtPayload, url: string): Promise<any>;
    findMarkById(user: JwtPayload, markId: string): Promise<any>;
    createMark(user: JwtPayload, mark: Mark): Promise<any>;
    deleteMark(user: JwtPayload, markId: string): Promise<any>;
    updateMark(user: JwtPayload, mark: Mark): Promise<any>;
}
