var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from 'mongodb';
import { MongoGenericDAO } from './models/mongo-generic.dao';
export default function startDB(app) {
    return __awaiter(this, void 0, void 0, function* () {
        // const url = 'mongodb://mongodb:27017/myDB';
        // Connects to mongo db on host system
        // const url = 'mongodb://host.docker.internal:27017/googleTrends';
        const url = 'mongodb+srv://Marius:marius@cluster0-hfhor.mongodb.net/test?retryWrites=true&w=majority';
        // const options = {
        //   useNewUrlParser: true,
        //   auth: { user: 'Marius', password: 'Marius' },
        //   authSource: 'myDB'
        // };
        try {
            const client = yield MongoClient.connect(url);
            const db = client.db('webMarker');
            app.locals.marksDAO = new MongoGenericDAO(db, 'marks');
            console.log("Successfully connected to MongoDB!");
        }
        catch (err) {
            console.log('Could not connect to MongoDB: ', err.stack);
            process.exit(1);
        }
    });
}
//# sourceMappingURL=db.js.map