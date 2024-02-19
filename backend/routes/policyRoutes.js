import express, { request } from 'express';
import Policy from '../models/Policy.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
const PolicyRouter = express.Router();

PolicyRouter.post(
  '/create',
  expressAsyncHandler(async (req, res) => {
    const { name, link } = req.body;
    const policy = new Policy({ name, link });
    await policy.save();
    res.send({ message: 'Policy Created', policy });
  })
);

PolicyRouter.get('/', async (req, res) => {
  // Insert new employee data using insertMany()
  const policies = await Policy.findAll();

  // Send the created employees as the response
  res.send({ policies });
});

PolicyRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const policies = await Policy.findByPk(id);

  // Send the created employees as the response
  res.send({ policies });
});

PolicyRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const findpolicy = await Policy.findByPk(req.params.id);

    if (!findpolicy) {
      res.status(404).send({ message: 'policy not found' });
      return;
    }
    // If the employee is not protected, delete them
    const deletedpolicy = await findpolicy.destroy();
    res.send({ message: 'policy Deleted', deletedpolicy });
  })
);
export default PolicyRouter;
