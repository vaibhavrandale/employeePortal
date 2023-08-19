import express from 'express';
import Notice from '../models/noticeModel.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
const NoticeRouter = express.Router();

NoticeRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      img,
      title,
      date,
      subject,
      description,
      briefNotice,
      highlightPoints,
      noticeBy,
      seal,
    } = req.body;
    const notice = new Notice({
      img,
      title,
      date,
      subject,
      description,
      briefNotice,
      highlightPoints,
      noticeBy,
      seal,
    });
    await notice.save();
    res.send({ message: 'Notice  Created', notice });
  })
);

NoticeRouter.get('/', async (req, res) => {
  const notices = await Notice.find();

  // Send the created employees as the response
  res.send({ notices });
});

export default NoticeRouter;
