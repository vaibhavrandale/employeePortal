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

// surveyRouter.put(
//   '/sitesurveys/:projectCode/:id',
//   isAuth,
//   isAdmin,

//   expressAsyncHandler(async (req, res) => {
//     const projectCode = req.params.projectCode;
//     const surveyId = req.params.sid;

//     try {
//       // Find the survey by ID and project code
//       const survey = await Survey.findOne({
//         surveyId,
//         projectCode,
//       });
//       console.log(survey);
//       if (survey) {
//         // survey.surveyId = req.body.surveyId;
//         survey.block = req.body.block;
//         survey.row = req.body.row;
//         survey.table = req.body.table;
//         survey.A = req.body.A;
//         survey.B = req.body.B;
//         survey.C = req.body.C;
//         survey.D = req.body.D;
//         survey.E = req.body.E;
//         survey.F = req.body.F;
//         survey.G = req.body.G;
//         survey.H = req.body.H;
//         survey.I = req.body.I;
//         survey.J = req.body.J;
//         survey.htablex = req.body.htablex;
//         survey.htabley = req.body.htabley;
//         // Set the submittedBy field to the logged-in user's name
//         survey.submittedBy = req.employee.name; // Assuming the user's name is available in req.user
//         // Set the submittedAt field to the current date and time
//         survey.submittedAt = new Date();
//         product.img = req.body.img;
//         //product.images = req.body.images;

//         // Save the updated survey
//         const updatedSurvey = await survey.save();
//         res.status(200).json(updatedSurvey);
//       } else {
//         res.status(404).json({ message: 'Survey not Updated' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   })
// );

surveyRouter.put(
  '/sitesurveys/:projectCode/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const projectCode = req.params.projectCode;
    const id = req.params._id;

    try {
      const updatedSurvey = await Survey.findOne(
        { id, projectCode },
        {
          block: req.body.block,
          row: req.body.row,
          table: req.body.table,
          A: req.body.A,
          B: req.body.B,
          C: req.body.C,
          D: req.body.D,
          E: req.body.E,
          F: req.body.F,
          G: req.body.G,
          H: req.body.H,
          I: req.body.I,
          J: req.body.J,
          htablex: req.body.htablex,
          htabley: req.body.htabley,
          submittedBy: req.employee.name,
          submittedAt: new Date(),
          img: req.body.img,
        },
        { new: true } // Return the updated document
      );

      if (updatedSurvey) {
        res.status(200).json(updatedSurvey);
      } else {
        res.status(404).json({ message: 'Survey not Updated' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  })
);

surveyRouter.post(
  '/sitesurveys/:projectCode/:id/reviews',
  isAuth,
  isAdmin,

  expressAsyncHandler(async (req, res) => {
    const projectCode = req.params.projectCode;
    const id = req.params.surveyId;
    try {
      // Find the survey by ID and project code
      const survey = await Survey.findById(id, projectCode);
      if (survey) {
        const review = {
          verifiedBy: req.employee.name,
          verifiededAt: new Date(),
          remark: req.body.remark,
          remarkBy: request.employee.name,
        };
        survey.reviews.push(review);
        survey.numReviews = survey.reviews.length;
        survey.rating =
          survey.reviews.reduce((a, c) => c.rating + a, 0) /
          survey.reviews.length;
        const updatedSurvey = await product.save();
        res.status(201).send({
          message: 'Remark Added',
          review: updatedSurvey.reviews[updatedSurvey.reviews.length - 1],
          numReviews: survey.numReviews,
          rating: survey.rating,
        });
      } else {
        res.status(404).send({ message: 'Survey Not Found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  })
);

// surveyRouter.post(
//   '/sitesurveys',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const newSurvey = new Survey({
//       projectCode: 'projectcode1' + Date.now(),
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
      block: 'block X' + Date.now(),
      surveyId: 'survey' + Date.now(),
      row: 'row x',
      table: 'table x',
      structure: '2P',
      A: 'table x',
      B: 'table x',
      C: 'table x',
      D: 'table x',
      E: 'table x',
      F: 'TABLE F',
      G: 'table x',
      H: 'table x',
      I: 'table x',
      J: 'table x',
      htablex: 'h table X',
      htabley: 'h table y',
      submittedBy: req.employee.name,
      submittedAt: new Date(),
      rating: 0,
      numReviews: 0,
      img: '/images/taypro_standard.png',
      // customerLogo: '/images/sample_logo.png',
    });
    const survey = await newSurvey.save();
    res.send({ message: 'Survey Created', survey });
  })
);

surveyRouter.get('/sitesurveys/:projectCode/:id', async (req, res) => {
  const projectCode = req.params.projectCode;
  const id = req.params.surveyId;

  // Fetch site survey data based on the project code and survey ID
  const siteSurvey = await Survey.findOne({ projectCode, id });

  if (siteSurvey) {
    res.send({ siteSurvey });
  } else {
    res.status(404).send({ message: 'Site survey not found' });
  }
});

export default surveyRouter;
