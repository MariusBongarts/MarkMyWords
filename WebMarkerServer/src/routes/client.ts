import { Mark } from './../models/mark';
import express from 'express';
import { MongoGenericDAO } from '../models/mongo-generic.dao';
import path from 'path';

const router = express.Router();

const appDir = path.resolve(__dirname, "public");

router.get('/', async (req, res) => {
  res.sendFile(path.resolve(appDir, "index.html"));
});



export default router;