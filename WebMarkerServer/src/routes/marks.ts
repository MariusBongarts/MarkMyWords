import { Mark } from './../models/mark';
import express from 'express';
import { MongoGenericDAO } from '../models/mongo-generic.dao';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log("Get")
  const marksDAO: MongoGenericDAO<Mark> = req.app.locals.marksDAO;

  const marks = await marksDAO.findAll();

  res.send(marks);
});

router.post('/', async (req, res) => {
  console.log("Post")
  const marksDAO: MongoGenericDAO<Mark> = req.app.locals.marksDAO;
  const mark = req.body as Mark;
  const createdMark = await marksDAO.create(mark);
  res.send(createdMark);
});


export default router;