var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpClient } from './http-client';
export class MarkerService {
    constructor() {
        //this.httpClient = new HttpClient({ baseURL: 'http://ec2-3-130-73-179.us-east-2.compute.amazonaws.com:3000' });
        // this.httpClient = new HttpClient({ baseURL: 'http://localhost:3000' });
        this.httpClient = new HttpClient({ baseURL: 'https://marius96.uber.space' });
        // Backup Gateway
        // this.httpClient = new HttpClient({ baseURL: ' http://10.42.30.122:8080/finance/' });
    }
    getMarks() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.get('/marks');
            console.log(response);
            const marks = yield response.json();
            console.log(marks);
            return marks;
        });
    }
    createMark(mark) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.post('/marks', mark);
            const createdMark = yield response.json();
            console.log(`Created mark with id ${createdMark.id}`);
            return createdMark;
        });
    }
    deleteMark(markId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.httpClient.delete('/marks?id=' + markId);
        });
    }
    updateMark(mark) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.httpClient.put('/marks', mark);
        });
    }
    getMarkById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.get('/marks/' + id);
            console.log(response);
            const mark = yield response.json();
            return mark;
        });
    }
}
//# sourceMappingURL=marker.service.js.map