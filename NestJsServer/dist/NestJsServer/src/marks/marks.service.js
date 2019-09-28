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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mark_gateway_1 = require("./mark.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
let MarksService = class MarksService {
    constructor(markModel, markGateway) {
        this.markModel = markModel;
        this.markGateway = markGateway;
    }
    getMarksForUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.markModel.find({ _user: user._id }).exec();
        });
    }
    getMarksForUrl(user, url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(url);
            return yield this.markModel.find({ _user: user._id, url: url }).exec();
        });
    }
    findMarkById(user, markId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.markModel.findOne({ _user: user._id, id: markId });
        });
    }
    createMark(user, mark) {
        return __awaiter(this, void 0, void 0, function* () {
            let createdMark = new this.markModel(mark);
            createdMark._user = user._id;
            return yield createdMark.save();
        });
    }
    deleteMark(user, markId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.markModel.deleteOne({ _user: user._id, id: markId });
        });
    }
    updateMark(user, mark) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.markModel.updateOne({ _user: user._id, id: mark.id }, mark);
        });
    }
};
MarksService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Mark')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, mark_gateway_1.MarkGateway])
], MarksService);
exports.MarksService = MarksService;
//# sourceMappingURL=marks.service.js.map