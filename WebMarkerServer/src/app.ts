import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import startDB from './db';
import marks from './routes/marks';
import path from 'path';

const appDir = path.resolve(__dirname, "public");

const port = 3000;

function configureApp(app: Express) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Set HTTP-Header
  app.use(function (req, res, next) {

    if (true) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Headers', 'content-type');
      res.set('Access-Control-Allow-Methods', '*');
    }
    // res.set('Set-Cookie', 'SID=xyz; Path=/myapp; Secure; HttpOnly; SameSite=Strict')
    next();

  });
  app.use('/marks', marks);
  app.use('', express.static(appDir));
}

function originAllowed(req: any) {
  if (req.get('Origin').startsWith('http://localhost:')) {
    return true;
  } else {
    return false;
  }
}

async function start() {
  const app = express();
  configureApp(app);
  await startDB(app);
  startHttpServer(app);
}

function startHttpServer(app: Express) {
  app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

start();
