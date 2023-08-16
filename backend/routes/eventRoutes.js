import express, { request } from 'express';
import Event from '../models/Events.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
const EventRouter = express.Router();

EventRouter.post(
  '/events',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { title, date, description } = req.body;
    const event = new Event({ title, date, description });
    await event.save();
    res.send({ message: 'Event Created', event });
  })
);
export default EventRouter;
