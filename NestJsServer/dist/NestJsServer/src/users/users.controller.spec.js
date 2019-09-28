"use strict";
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
const testing_1 = require("@nestjs/testing");
const users_controller_1 = require("./users.controller");
describe('Users Controller', () => {
    let module;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        module = yield testing_1.Test.createTestingModule({
            controllers: [users_controller_1.UsersController],
        }).compile();
    }));
    it('should be defined', () => {
        const controller = module.get(users_controller_1.UsersController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=users.controller.spec.js.map