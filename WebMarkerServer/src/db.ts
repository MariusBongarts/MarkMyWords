import { Mark } from './models/mark';
import { MongoClient } from 'mongodb';
import { Express } from 'express';
import { MongoGenericDAO } from './models/mongo-generic.dao';
import { resolve } from 'url';
export default async function startDB(app: Express) {
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
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db('webMarker');
    app.locals.marksDAO = new MongoGenericDAO<Mark>(db, 'marks');
    console.log("Successfully connected to MongoDB!")

  }catch(err) {
    console.log('Could not connect to MongoDB: ', err.stack);
    process.exit(1);
  }

}
