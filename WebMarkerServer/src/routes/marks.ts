import { Mark } from './../models/mark';
import express from 'express';
import { MongoGenericDAO } from '../models/mongo-generic.dao';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log(`Get from ${req.url}`);
  const marksDAO: MongoGenericDAO<Mark> = req.app.locals.marksDAO;

  const marks = await marksDAO.findAll();

  res.send(marks);
});

router.get('/:id', async (req, res) => {
  console.log(`Get from ${req.url}`);
  const marksDAO: MongoGenericDAO<Mark> = req.app.locals.marksDAO;
  const id = req.params.id
  const marks = await marksDAO.findOne({id: id});

  res.send(marks);
});

router.post('/', async (req, res) => {
  console.log(`Post from ${req.url}`);
  const marksDAO: MongoGenericDAO<Mark> = req.app.locals.marksDAO;
  const mark = req.body as Mark;
  const createdMark = await marksDAO.create(mark);
  res.send(createdMark);
});

router.delete('/', async (req, res) => {
  const marksDAO: MongoGenericDAO<Mark> = req.app.locals.marksDAO;
  const markId = req.query["id"] as string;
  console.log(`Deleting ${markId}`);
  await marksDAO.delete(markId);
  res.sendStatus(200);
});

router.put('/', async (req, res) => {
  const marksDAO: MongoGenericDAO<Mark> = req.app.locals.marksDAO;
  const mark = req.body as Mark;
  console.log(`Updating ${mark.id}`);
  await marksDAO.update(mark);
  res.send(mark);
});



export default router;