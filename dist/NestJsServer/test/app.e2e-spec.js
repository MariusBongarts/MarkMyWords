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
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
describe('AppController (e2e)', () => {
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleFixture = yield Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        yield app.init();
    }));
    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map