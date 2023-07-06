import express from 'express';
import Employee from '../models/employeeModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

const emplyeeRouter = express.Router();

emplyeeRouter.get('/', async (req, res) => {
  // Insert new employee data using insertMany()
  const Employees = await Employee.find();

  // Send the created employees as the response
  res.send({ Employees });
});

emplyeeRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ email: req.body.email });
    if (
      employee &&
      bcrypt.compareSync(req.body.employee_id, employee.employee_id)
    ) {
      res.send({
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        isAdmin: employee.isAdmin,
      });
      return;
    }
    res.status(401).send({ message: 'Invalid Credentials' });
  })
);

export default emplyeeRouter;
