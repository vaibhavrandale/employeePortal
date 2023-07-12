import express from 'express';
import Survey from '../models/surveyModel.js';
import Sites from '../models/siteDetailsModel.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

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

// ------------------------------------------------------------------------

surveyRouter.post(
  '/sites',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newSite = new Sites({
      projectCode: 'projectcode' + Date.now(),
      customerName: 'customerName' + Date.now(),
      customerLogo: '/images/sample_logo.png',
      siteLocation: 'siteLocation',
      plantCapacity: 'plantCapacity',
    });
    const site = await newSite.save();
    res.send({ message: 'Site Created', site });
  })
);

surveyRouter.get('/sites/:id', async (req, res) => {
  const site = await Sites.findById(req.params.id);
  if (site) {
    res.send(site);
  } else {
    res.status(404).send({ message: 'Site Not Found' });
  }
});

surveyRouter.put(
  '/sites/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const siteId = req.params.id;
    const site = await Sites.findById(siteId);
    if (site) {
      site.customerName = req.body.customerName;
      site.siteLocation = req.body.siteLocation;
      site.projectCode = req.body.projectCode;
      site.customerLogo = req.body.customerLogo;
      site.plantCapacity = req.body.plantCapacity;

      await site.save();
      res.send({ message: 'Site Updated' });
    } else {
      res.status(404).send({ message: 'Site Not Found' });
    }
  })
);

// ----------------------------------------------------------------------------

surveyRouter.get('/sitesurveys/:projectCode/:id', async (req, res) => {
  const projectCode = req.params.projectCode;
  const id = req.params.surveyId;

  // Fetch site survey data based on the project code and survey ID
  const siteSurvey = await Survey.findOne({ projectCode, id });

  res.send({ siteSurvey });
});

export default surveyRouter;
