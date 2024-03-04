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

// holidayRouter.get('/total/:month/:year', async (req, res) => {
//   const { month, year } = req.params;

//   try {
//     // Count holidays for the specified month and year
//     const holidayCount = await Holidays.count({
//       where: {
//         date: {
//           [Op.and]: [
//             Sequelize.where(
//               Sequelize.fn('MONTH', Sequelize.col('date')),
//               month
//             ),
//             Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
//           ],
//         },
//       },
//     });

//     // Send the count as the response
//     res.status(200).send(holidayCount.toString()); // Convert to string if necessary
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });

// holidayRouter.put('/:id', async (req, res) => {
//   const id = req.params.id;
//   const { name, img, date } = req.body;

//   try {
//     const holiday = await Holidays.findByPk(id);

//     if (!holiday) {
//       return res
//         .status(404)
//         .json({ success: false, error: 'holiday not found' });
//     }

//     holiday.img = img;
//     holiday.name = name;
//     holiday.date = date;

//     // Save the updated holiday to the database
//     const updatedholiday = await holiday.save();

//     res.send({ updatedholiday, message: 'holiday updated' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });

// holidayRouter.delete(
//   '/:id',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const holiday = await Holidays.findByPk(req.params.id);

//     if (!holiday) {
//       res.status(404).send({ message: 'holiday not found' });
//       return;
//     }
//     // If the employee is not protected, delete them
//     const deletedholiday = await holiday.destroy();
//     res.send({ message: 'holiday Deleted', deletedholiday });
//   })
// );

// holidayRouter.post(
//   '/',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const {
//       name,
//       img,
//       date,
//       // description
//     } = req.body;
//     const newholiday = new Holidays({
//       name,
//       img,
//       date,
//       // description
//     });
//     const holiday = await newholiday.save();
//     res.send({ holiday, message: 'holiday Created' });
//   })
// );

export default accessRouter;
