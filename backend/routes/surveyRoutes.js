import express from 'express';
import Survey from '../models/surveyModel.js';
import Sites from '../models/siteDetailsModel.js';

const surveyRouter = express.Router();

surveyRouter.get('/sites', async (req, res) => {
  // Insert new employee data using insertMany()
  const sitelist = await Sites.find();

  // Send the created employees as the response
  res.send({ sitelist });
});

surveyRouter.get('/sitesurveys/:projectCode', async (req, res) => {
  const projectCode = req.params.projectCode;

  // Fetch site survey data based on the project code
  const siteSurveys = await Survey.find({ projectCode });

  // Send the site surveys as the response
  res.send({ siteSurveys });
});

surveyRouter.get('/sitesurveys/:projectCode/:id', async (req, res) => {
  const projectCode = req.params.projectCode;
  const id = req.params.surveyId;

  // Fetch site survey data based on the project code and survey ID
  const siteSurvey = await Survey.findOne({ projectCode, id });

  res.send({ siteSurvey });
});

export default surveyRouter;
