import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { UsersService } from './../users/users.service';
import { MarksService } from './marks.service';
export declare class MarksController {
    private marksService;
    private usersService;
    private logger;
    constructor(marksService: MarksService, usersService: UsersService);
    getMarks(userJwt: JwtPayload, req: any): Promise<any>;
    getMarksForUrl(userJwt: JwtPayload, query: any): Promise<any>;
    getMarkById(userJwt: JwtPayload, markId: any, req: any): Promise<any>;
    createMark(userJwt: JwtPayload, mark: any, req: any): Promise<any>;
    deleteMark(userJwt: JwtPayload, markId: any, req: any): Promise<any>;
    updateMark(userJwt: JwtPayload, mark: any, req: any): Promise<any>;
}
