var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import * as bodyParser from 'body-parser';
import startDB from './db';
import marks from './routes/marks';
const port = 3000;
function configureApp(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // Set HTTP-Header
    app.use(function (req, res, next) {
        if (true) {
            res.set('Access-Control-Allow-Origin', req.get('Origin'));
            res.set('Access-Control-Allow-Headers', 'content-type');
            res.set('Access-Control-Allow-Methods', 'DELETE');
        }
        // res.set('Set-Cookie', 'SID=xyz; Path=/myapp; Secure; HttpOnly; SameSite=Strict')
        next();
    });
    app.use('/marks', marks);
}
function originAllowed(req) {
    if (req.get('Origin').startsWith('http://localhost:')) {
        return true;
    }
    else {
        return false;
    }
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        configureApp(app);
        yield startDB(app);
        startHttpServer(app);
    });
}
function startHttpServer(app) {
    app.listen(port, () => {
        console.log(`Server running at http://0.0.0.0:${port}`);
    });
}
start();
//# sourceMappingURL=app.js.map