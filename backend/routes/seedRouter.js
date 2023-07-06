import express from 'express';
import Employee from '../models/employeeModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Employee.deleteMany({}); // Remove all existing documents from the Employee collection

  // Insert new employee data using insertMany()
  const createdEmployees = await Employee.insertMany(data.employees);

  // Send the created employees as the response
  res.send({ createdEmployees });
});

export default seedRouter;
