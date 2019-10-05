"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = require("./../users/users.service");
const marks_service_1 = require("./marks.service");
const email_decorator_1 = require("./../users/decorators/email.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const common_2 = require("@nestjs/common");
let MarksController = class MarksController {
    constructor(marksService, usersService) {
        this.marksService = marksService;
        this.usersService = usersService;
        this.logger = new common_2.Logger('MarksController');
    }
    getMarks(userJwt, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const marks = yield this.marksService.getMarksForUser(userJwt);
            this.logger.log(`${userJwt.email} loaded ${marks.length} marks from ${req.get('origin')}.`);
            return marks;
        });
    }
    getMarksForUrl(userJwt, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const marks = yield this.marksService.getMarksForUrl(userJwt, query.url);
            this.logger.log(`${userJwt.email} loaded ${marks.length} marks from ${query.url}.`);
            return marks;
        });
    }
    getMarkById(userJwt, markId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const mark = yield this.marksService.findMarkById(userJwt, markId);
            this.logger.log(`${userJwt.email} loaded mark ${mark.id} from ${req.get('origin')}.`);
            return mark;
        });
    }
    createMark(userJwt, mark, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdMark = yield this.marksService.createMark(userJwt, mark);
            this.logger.log(`${userJwt.email} created mark ${mark.id} from ${req.get('origin')}.`);
            return createdMark;
        });
    }
    deleteMark(userJwt, markId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedMark = yield this.marksService.deleteMark(userJwt, markId);
            this.logger.log(`${userJwt.email} deleted mark ${markId} from ${req.get('origin')}.`);
            return deletedMark;
        });
    }
    updateMark(userJwt, mark, req) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`${userJwt.email} updated mark ${mark.id} from ${req.get('origin')}.`);
            return yield this.marksService.updateMark(userJwt, mark);
        });
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, email_decorator_1.UserJwt()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarksController.prototype, "getMarks", null);
__decorate([
    common_1.Get('/url'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, email_decorator_1.UserJwt()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarksController.prototype, "getMarksForUrl", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, email_decorator_1.UserJwt()), __param(1, common_1.Param('id')), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MarksController.prototype, "getMarkById", null);
__decorate([
    common_1.Post(''),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, email_decorator_1.UserJwt()), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MarksController.prototype, "createMark", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, email_decorator_1.UserJwt()), __param(1, common_1.Param('id')), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MarksController.prototype, "deleteMark", null);
__decorate([
    common_1.Put(''),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, email_decorator_1.UserJwt()), __param(1, common_1.Body()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MarksController.prototype, "updateMark", null);
MarksController = __decorate([
    common_1.Controller('marks'),
    __metadata("design:paramtypes", [marks_service_1.MarksService,
        users_service_1.UsersService])
], MarksController);
exports.MarksController = MarksController;
//# sourceMappingURL=marks.controller.js.map