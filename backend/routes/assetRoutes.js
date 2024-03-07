import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Sequelize, Op } from 'sequelize';
import { isAuth, isAdmin } from '../utils.js';
import dotenv from 'dotenv';
import EmployeeAssets from '../models/EmployeeAssets.js';
import Employee from '../models/employeeModel.js';

const assetsRouter = express.Router();

dotenv.config();

assetsRouter.get('/', async (req, res) => {
  // Insert new employee data using insertMany()
  const assets = await EmployeeAssets.findAll();

  // Send the created employees as the response
  res.send({ assets });
});

assetsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const asset = await EmployeeAssets.findByPk(id);
  if (asset) {
    // Send the created employees as the response
    res.status(200).send({ message: `Asset found`, asset });
  } else {
    res.status(404).send({ message: `No asset found with id: ${id}` });
  }
});

// assetsRouter.post(
//   '/create',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const {
//       name,
//       employee_id,
//       email,
//       imageA,
//       imageB,
//       status,
//       given_date,
//       return_date,
//       remark,
//       // description
//     } = req.body;
//     const newasset = new EmployeeAssets({
//       name,
//       employee_id,
//       email,
//       imageA,
//       imageB,
//       status,
//       given_date,
//       return_date,
//       remark,
//     });
//     const asset = await newasset.save();
//     res.send({ message: 'asset Created', asset });
//   })
// );

assetsRouter.post(
  '/create',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      employee_id,
      imageA,
      imageB,
      status,
      given_date,
      return_date,
      remark,
      // description
    } = req.body;

    // Fetch employee details based on employee_id
    const employee = await Employee.findOne({
      where: { employee_id: employee_id },
    });
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    // Create a new asset with employee details
    const newAsset = new EmployeeAssets({
      name: employee.NAME,
      employee_id,
      email: employee.email,
      imageA,
      imageB,
      status,
      given_date,
      return_date,
      remark,
    });

    // Save the new asset
    const asset = await newAsset.save();

    res.send({ message: 'Asset Created', asset });
  })
);

assetsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { imageB, status, return_date, remark } = req.body;

  try {
    const Asset = await EmployeeAssets.findByPk(id);

    if (!Asset) {
      return res.status(404).json({ success: false, error: 'Asset not found' });
    }

    Asset.imageB = imageB;
    Asset.status = status;
    Asset.return_date = return_date;
    Asset.remark = remark;

    const updatedAsset = await Asset.save();

    res.send({ message: 'assets updated', updatedAsset });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

assetsRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const Asset = await EmployeeAssets.findByPk(req.params.id);

    if (!Asset) {
      res.status(404).send({ message: 'Asset not found' });
      return;
    }
    // If the employee is not protected, delete them
    const deletedAsset = await Asset.destroy();
    res.send({ message: 'Asset Deleted', deletedAsset });
  })
);

export default assetsRouter;
