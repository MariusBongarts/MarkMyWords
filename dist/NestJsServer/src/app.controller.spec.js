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
import { AppController } from './app.controller';
import { AppService } from './app.service';
describe('AppController', () => {
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = yield Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
    }));
    describe('root', () => {
        it('should return "Hello World!"', () => {
            const appController = app.get(AppController);
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
});
//# sourceMappingURL=app.controller.spec.js.map