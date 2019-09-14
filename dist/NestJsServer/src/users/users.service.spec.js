var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
describe('UsersService', () => {
    let service;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield Test.createTestingModule({
            providers: [UsersService],
        }).compile();
        service = module.get(UsersService);
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=users.service.spec.js.map