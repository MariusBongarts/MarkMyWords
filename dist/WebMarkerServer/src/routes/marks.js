var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const router = express.Router();
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("Get");
    const marksDAO = req.app.locals.marksDAO;
    const marks = yield marksDAO.findAll();
    res.send(marks);
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("Post");
    const marksDAO = req.app.locals.marksDAO;
    const mark = req.body;
    const createdMark = yield marksDAO.create(mark);
    res.send(createdMark);
}));
router.delete('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const marksDAO = req.app.locals.marksDAO;
    const markId = req.body.id;
    console.log(`Deleting ${markId}`);
    yield marksDAO.delete(markId);
    res.send(200);
}));
export default router;
//# sourceMappingURL=marks.js.map