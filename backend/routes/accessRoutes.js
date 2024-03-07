import express from 'express';

import { Sequelize, Op } from 'sequelize';

import expressAsyncHandler from 'express-async-handler';
import {
  generateToken,
  baseUrl,
  isAuth,
  isAdmin,
  isSuperAdmin,
} from '../utils.js';
import dotenv from 'dotenv';

import Access from '../models/AccessModel.js';

const accessRouter = express.Router();

dotenv.config();

accessRouter.get('/', async (req, res) => {
  // Insert new employee data using insertMany()
  const access = await Access.findAll();

  // Send the created employees as the response
  res.send({ access });
});

accessRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      name,
      status,
      // description
    } = req.body;
    const newAccess = new Access({
      name,
      status,
      // description
    });
    const access = await newAccess.save();
    res.send({ access, message: 'access Created' });
  })
);

accessRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const access = await Access.findByPk(id);

  // Send the created employees as the response
  res.send({ access });
});

accessRouter.put('/activate/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const access = await Access.findByPk(id);

    if (!access) {
      return res
        .status(404)
        .json({ success: false, error: 'access not found' });
    }

    access.status = 0;

    // Save the updated holiday to the database
    const updatedaccess = await access.save();

    res.send({ updatedaccess, message: `${access.name}: access activated ` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

accessRouter.put('/deactivate/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const access = await Access.findByPk(id);

    if (!access) {
      return res
        .status(404)
        .json({ success: false, error: 'access not found' });
    }

    access.status = 1;

    // Save the updated holiday to the database
    const updatedaccess = await access.save();

    res.send({ updatedaccess, message: `${access.name}: access deactivated ` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// ------------------login button --------------------
accessRouter.put('/activate-login/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const access = await Access.findByPk(id);

    if (!access) {
      return res
        .status(404)
        .json({ success: false, error: 'access not found' });
    }

    access.status = 1;

    // Save the updated holiday to the database
    const updatedaccess = await access.save();

    res.send({ message: `${access.name}: access activated `, updatedaccess });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
accessRouter.put('/deactivate-login/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const access = await Access.findByPk(id);

    if (!access) {
      return res
        .status(404)
        .json({ success: false, error: 'access not found' });
    }

    access.status = 0;

    // Save the updated holiday to the database
    const updatedaccess = await access.save();

    res.send({
      message: `${access.name}: access  deactivated `,
      updatedaccess,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
// ------------------login button --------------------

export default accessRouter;
