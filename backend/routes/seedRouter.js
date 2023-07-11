import express from 'express';
import Employee from '../models/employeeModel.js';
import data from '../data.js';
import Sites from '../models/siteDetailsModel.js';
import Survey from '../models/surveyModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Employee.deleteMany({}); // Remove all existing documents from the Employee collection
  const createdEmployees = await Employee.insertMany(data.employees);

  await Sites.deleteMany({});
  const creatdsiteDetails = await Sites.insertMany(data.siteDetails);

  await Survey.deleteMany({});
  const creatdSiteSurvey = await Survey.insertMany(data.SiteSurvey);
  // Send the created employees as the response
  res.send({ createdEmployees, creatdsiteDetails, creatdSiteSurvey });
});

export default seedRouter;
