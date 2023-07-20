import express from 'express';
import Employee from '../models/employeeModel.js';
import expressAsyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const emplyeeRouter = express.Router();

emplyeeRouter.get('/', async (req, res) => {
  // Insert new employee data using insertMany()
  const employees = await Employee.find();

  // Send the created employees as the response
  res.send({ employees });
});

emplyeeRouter.get('/details/:id', async (req, res) => {
  const id = req.params.id;
  const employee = await Employee.findById(id);

  // Send the created employees as the response
  res.send({ employee });
});

// emplyeeRouter.post(
//   '/signin',
//   expressAsyncHandler(async (req, res) => {
//     const employee = await Employee.findOne({ email: req.body.email });
//     if (employee && req.body.password === employee.employee_id) {
//       // Code to be executed if the employee ID matches

//       res.send({
//         _id: employee._id,
//         name: employee.name,
//         email: employee.email,
//         isAdmin: employee.isAdmin,
//         activate: employee.activate,
//         token: generateToken(employee),
//       });
//       return;
//     }
//     res.status(401).send({ message: 'Invalid Credentials' });
//   })
// );

emplyeeRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ email: req.body.email });
    if (employee && req.body.password === employee.employee_id) {
      // Code to be executed if the employee ID matches

      res.send({
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        isAdmin: employee.isAdmin,
        isSuperAdmin: employee.isSuperAdmin,
        isSales: employee.isSales,
        isScm: employee.isScm,
        isDesign: employee.isDesign,
        isProject: employee.isProject,
        isVisitor: employee.isVisitor,
        isProduction: employee.isProduction,
        isAccountant: employee.isAccountant,
        activate: employee.activate,
        profileImage: employee.image, // Include the profile image URL
        token: generateToken(employee),
      });
      return;
    }
    res.status(401).send({ message: 'Invalid Credentials' });
  })
);

export default emplyeeRouter;
