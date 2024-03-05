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

// import Access from '../models/AccessModel.js';
import UIDCard from '../models/UIDCard.js';
import RfidCkeck from '../models/RfidCkeck.js';
import RfidReg from '../models/RfidReg.js';
import Employee from '../models/employeeModel.js';

const UIDCardRouter = express.Router();

dotenv.config();

UIDCardRouter.get('/', async (req, res) => {
  // Insert new employee data using insertMany()
  const uidCard = await UIDCard.findAll();

  // Send the created employees as the response
  res.send({ uidCard });
});

UIDCardRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch a single record from the UIDCard table based on the provided id
    const uidCard = await UIDCard.findOne({
      where: { employee_id: id }, // Adjust the where condition based on your model
    });

    if (uidCard) {
      // Send the fetched record as the response
      res.send({ uidCard });
    } else {
      // If the record is not found, send a 404 response
      res.status(404).send({ message: 'UID Card not found' });
    }
  } catch (error) {
    console.error('Error fetching UID card:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// UIDCardRouter.put(
//   '/:id',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const {
//       current_uid,
//       updatedBy,
//       // description
//     } = req.body;
//     const { id } = req.params; // Corrected from 'rew' to 'req'

//     try {
//       const uidCardToUpdate = await UIDCard.findOne({
//         where: { employee_id: id },
//       });

//       if (uidCardToUpdate) {
//         // Set prevoius_uid to the existing current_uid
//         const previousUID = uidCardToUpdate.current_uid;

//         uidCardToUpdate.prevoius_uid = previousUID;
//         uidCardToUpdate.current_uid = current_uid;
//         uidCardToUpdate.updatedBy = updatedBy;

//         const updateUidCard = await uidCardToUpdate.save();
//         res.status(200).send({ message: 'UID Card Updated', updateUidCard });
//       } else {
//         res.status(404).send({ message: 'UID Card not found' });
//       }
//     } catch (error) {
//       console.error('Error updating UID Card:', error);
//       res.status(500).send({ message: 'Internal Server Error' });
//     }
//   })
// );

// -------------update in all tables-------------------
UIDCardRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { current_uid, updatedBy } = req.body;
    const { id } = req.params;

    try {
      const uidCardToUpdate = await UIDCard.findOne({
        where: { employee_id: id },
      });

      if (uidCardToUpdate) {
        const previousUID = uidCardToUpdate.current_uid;

        // Update UIDCard table
        uidCardToUpdate.prevoius_uid = previousUID;
        uidCardToUpdate.current_uid = current_uid;
        uidCardToUpdate.updatedBy = updatedBy;
        const updatedUidCard = await uidCardToUpdate.save();

        // Update RfidCkecks table
        const updatedRfidCkeck = await RfidCkeck.update(
          { UID: current_uid },
          { where: { employee_id: id } }
        );

        // Update RfidRegs table
        const updatedRfidReg = await RfidReg.update(
          { UID: current_uid },
          { where: { Reg_no: id } }
        );

        // Update employees table
        const updatedEmployee = await Employee.update(
          { UID: current_uid },
          { where: { employee_id: id } }
        );

        res.status(200).send({
          message: `UID Card ${current_uid} and related tables updated`,
          UIDCard: updatedUidCard,
          RfidRegs: updatedRfidReg,
          RfidCkecks: updatedRfidCkeck,
          Employee: updatedEmployee,
        });
      } else {
        res.status(404).send({ message: 'UID Card not found' });
      }
    } catch (error) {
      console.error('Error updating UID Card:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  })
);

// -------------update in all tables-------------------

UIDCardRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const access = await UIDCard.findByPk(id);

  // Send the created employees as the response
  res.send({ access });
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

export default UIDCardRouter;
