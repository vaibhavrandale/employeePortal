import express, { request } from 'express';
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

surveyRouter.get('/sitesurveys/:projectCode', async (req, res) => {
  const projectCode = req.params.projectCode;

  // Fetch site survey data based on the project code
  const siteSurveys = await Survey.find({ projectCode });

  // Send the site surveys as the response
  res.send({ siteSurveys });
});

surveyRouter.get('/sitesurveys/:id/reviews', async (req, res) => {
  const surveyid = req.params.projectCode;

  // Fetch site survey data based on the project code
  const remarks = await Survey.find({ surveyid });

  // Send the site surveys as the response
  res.send({ remarks });
});

surveyRouter.post(
  '/sitesurveys/:id/reviews',
  isAuth,
  isAdmin,

  expressAsyncHandler(async (req, res) => {
    // const projectCode = req.params.projectCode;
    const surveyid = req.params.id;

    // Find the survey by ID and project code
    const survey = await Survey.findById(surveyid);
    if (survey) {
      const review = {
        // verifiedBy: req.employee.name,
        // verifiededAt: new Date(),
        remark: req.body.remark,
        rating: Number(5),
        remarkBy: req.employee.name,
      };
      survey.reviews.push(review);
      survey.numReviews = survey.reviews.length;
      survey.rating =
        survey.reviews.reduce((a, c) => c.rating + a, 0) /
        survey.reviews.length;
      const updatedSurvey = await survey.save();
      // res.status(200).json(updatedSurvey);
      res.status(201).send({
        message: 'Remark Added',
        review: updatedSurvey.reviews[updatedSurvey.reviews.length - 1],
        numReviews: survey.numReviews,
        rating: survey.rating,
      });
    } else {
      res.status(404).send({ message: 'Survey Not Found' });
    }
  })
);

surveyRouter.put(
  '/sitesurveys/:id',
  isAuth,
  isAdmin,

  expressAsyncHandler(async (req, res) => {
    const surveyid = req.params.id;

    // Find the survey by ID and project code
    const survey = await Survey.findById(surveyid);
    // console.log(survey);
    if (survey) {
      survey.surveyId = req.body.surveyId;
      survey.block = req.body.block;
      survey.row = req.body.row;
      survey.table = req.body.table;
      survey.structure = req.body.structure;
      survey.A = req.body.A;
      survey.ImageA = req.body.ImageA;
      survey.B = req.body.B;
      survey.ImageB = req.body.ImageB;
      survey.C = req.body.C;
      survey.ImageC = req.body.ImageC;
      survey.D = req.body.D;
      survey.ImageD = req.body.ImageD;
      survey.E = req.body.E;
      survey.ImageE = req.body.ImageE;
      survey.F = req.body.F;
      survey.ImageF = req.body.ImageF;
      survey.G = req.body.G;
      survey.ImageG = req.body.ImageG;
      survey.H = req.body.H;
      survey.ImageH = req.body.ImageH;
      survey.I = req.body.I;
      survey.ImageI = req.body.ImageI;
      survey.J = req.body.J;
      survey.ImageJ = req.body.ImageJ;
      survey.htablex = req.body.htablex;
      survey.htabley = req.body.htabley;
      // Set the submittedBy field to the logged-in user's name
      survey.submittedBy = req.employee.name; // Assuming the user's name is available in req.user
      // Set the submittedAt field to the current date and time
      survey.submittedAt = new Date();
      survey.img = req.body.img;
      survey.status = req.body.status;
      survey.images = req.body.images;
      survey.verifiedBy = req.employee.name;
      survey.verifiededAt = new Date();
      // Save the updated survey
      const updatedSurvey = await survey.save();
      // res.status(200).json(UpdatedSurvey);
      res.status(200).json(updatedSurvey);
    } else {
      res.status(404).send({ message: 'Survey Not Found' });
    }
  })
);

//verify survey route

surveyRouter.put(
  '/sitesurveys/verify/:id',
  isAuth,
  isAdmin,

  expressAsyncHandler(async (req, res) => {
    const surveyid = req.params.id;

    // Find the survey by ID and project code
    const survey = await Survey.findById(surveyid);
    // console.log(survey);
    if (survey) {
      survey.surveyId = req.body.surveyId;
      survey.block = req.body.block;
      // survey.ImageC = req.body.ImageC;
      // survey.ImageG = req.body.ImageG;
      survey.status = req.body.status;

      survey.verifiedBy = req.employee.name;
      survey.verifiededAt = new Date();
      // Save the updated survey
      const updatedSurvey = await survey.save();
      // res.status(200).json(UpdatedSurvey);
      res.status(200).json(updatedSurvey);
    } else {
      res.status(404).send({ message: 'verified Survey Not Found' });
    }
  })
);

// surveyRouter.post(
//   '/sitesurveys/:projectCode',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const projectCode = req.params.projectCode;
//     const newSurvey = new Survey({
//       projectCode: projectCode,
//       block: 'block X' + Date.now(),
//       surveyId: 'survey' + Date.now(),
//       row: 'row x',
//       table: 'table x',
//       structure: '2P',
//       A: 'table x',
//       B: 'table x',
//       C: 'table x',
//       D: 'table x',
//       E: 'table x',
//       F: 'TABLE F',
//       G: 'table x',
//       H: 'table x',
//       I: 'table x',
//       J: 'table x',
//       htablex: 'h table X',
//       htabley: 'h table y',
//       submittedBy: req.employee.name,
//       submittedAt: new Date(),
//       rating: 0,
//       numReviews: 0,
//       img: '/images/taypro_standard.png',
//       // customerLogo: '/images/sample_logo.png',
//     });
//     const survey = await newSurvey.save();
//     res.send({ message: 'Survey Created', survey });
//   })
// );

surveyRouter.post(
  '/sitesurveys/:projectCode',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const projectCode = req.params.projectCode;
    const newSurvey = new Survey({
      projectCode: projectCode,
      block: '',
      surveyId: 'taypro' + Date.now(),
      row: '',
      table: '',
      structure: '',
      A: '',
      ImageA: '',
      B: '',
      ImageB: '',
      C: '',
      ImageC: '/images/taypro_standard_c.png',
      D: '',
      ImageD: '',
      E: '',
      ImageE: '',
      F: '',
      ImageF: '',
      G: '',
      ImageG: '/images/taypro_standard_g.png',
      H: '',
      ImageH: '',
      I: '',
      ImageI: '',
      J: '',
      ImageJ: '',
      htablex: '',
      htabley: '',
      submittedBy: req.employee.name,
      submittedAt: new Date(),
      rating: 0,
      numReviews: 0,
      verifiedBy: '',
      verifiededAt: '',
      img: '/images/taypro_standard.png',
      // customerLogo: '/images/sample_logo.png',
    });
    const survey = await newSurvey.save();
    res.send({ message: 'Survey Created', survey });
  })
);

surveyRouter.get('/sitesurveys/get/:id', async (req, res) => {
  // const projectCode = req.params.projectCode;
  const id = req.params.id;

  // Fetch site survey data based on the project code and survey ID
  const siteSurvey = await Survey.findById(id);

  if (siteSurvey) {
    res.send({ siteSurvey });
  } else {
    res.status(404).send({ message: 'Site survey not found' });
  }
});

export default surveyRouter;
