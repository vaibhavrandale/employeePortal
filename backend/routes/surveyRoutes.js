import express, { request } from 'express';
import Survey from '../models/surveyModel.js';
import Sites from '../models/siteDetailsModel.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import { mailgun, baseUrl } from '../utils.js';

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
      status: false,
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
      site.status = req.body.status;

      await site.save();
      res.send({ message: 'Site Updated' });
    } else {
      res.status(404).send({ message: 'Site Not Found' });
    }
  })
);

surveyRouter.put(
  '/sites/hide/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const siteId = req.params.id;
    const site = await Sites.findById(siteId);
    if (site) {
      site.status = req.body.status;

      await site.save();
      res.send({ message: 'Site Hided' });
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

// ---------------------------review------------------------

// surveyRouter.post(
//   '/sitesurveys/:id/reviews',
//   isAuth,
//   isAdmin,

//   expressAsyncHandler(async (req, res) => {
//     // const projectCode = req.params.projectCode;
//     const surveyid = req.params.id;

//     // Find the survey by ID and project code
//     const survey = await Survey.findById(surveyid);
//     if (survey) {
//       const review = {
//         // verifiedBy: req.employee.name,
//         // verifiededAt: new Date(),
//         remark: req.body.remark,
//         rating: Number(5),
//         remarkBy: req.employee.name,
//       };
//       survey.reviews.push(review);
//       survey.numReviews = survey.reviews.length;
//       survey.rating =
//         survey.reviews.reduce((a, c) => c.rating + a, 0) /
//         survey.reviews.length;
//       const updatedSurvey = await survey.save();
//       // res.status(200).json(updatedSurvey);
//       res.status(201).send({
//         message: 'Remark Added',
//         review: updatedSurvey.reviews[updatedSurvey.reviews.length - 1],
//         numReviews: survey.numReviews,
//         rating: survey.rating,
//       });
//     } else {
//       res.status(404).send({ message: 'Survey Not Found' });
//     }
//   })
// );

surveyRouter.post(
  '/sitesurveys/:id/reviews',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const surveyid = req.params.id;
    const survey = await Survey.findById(surveyid);
    const creatorEmail = survey.submittedByEmail;
    const creatorName = survey.submittedBy;
    const projectCode = survey.projectCode;
    const SurveyId = survey.surveyId;
    const id = survey._id;
    if (survey) {
      const review = {
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

      // Assuming you have the email and name of the person who created the survey
      const email = creatorEmail; // Replace with actual creator's email
      const Name = req.employee.name; // Replace with actual creator's name

      // Send an email to the survey creator using Mailgun
      mailgun()
        .messages()
        .send(
          {
            from: 'TAYPRO INTERNAL PORTAL <employee-lwbn@mg.yourdomain.com>',
            to: `<${email}>`,
            subject: 'A New Review has been Added!',
            html: `
             <p>Hello, <b>${creatorName}</b> A new Remark has been added to your survey by <b style="color: green;">${Name}</b>.</p> 
             <p> Project Code : ${projectCode}</p> 
             <p>Survey Id : ${id}</p> 
             <p>Remark: ${review.remark}</p>
             <a href="${baseUrl()}/survey/${id}"}>View Survey</a>
             `,
          },
          (error, body) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', body);
            }
          }
        );

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

// -----------------new---------------------
surveyRouter.post(
  '/sitesurveys/:projectCode',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const projectCode = req.params.projectCode;
    const newSurvey = new Survey({
      projectCode: projectCode,
      block: req.body.block,
      surveyId: 'taypro' + Date.now(),
      row: req.body.row,
      table: req.body.table,
      structure: req.body.structure,
      A: req.body.A,
      ImageA: req.body.ImageA,
      B: req.body.B,
      ImageB: req.body.ImageB,
      C: req.body.C,
      ImageC: req.body.ImageC,
      D: req.body.D,
      ImageD: req.body.ImageD,
      E: req.body.E,
      ImageE: req.body.ImageE,
      F: req.body.F,
      ImageF: req.body.ImageF,
      G: req.body.G,
      ImageG: req.body.ImageG,
      H: req.body.H,
      ImageH: req.body.ImageH,
      I: req.body.I,
      ImageI: req.body.ImageI,
      J: req.body.J,
      ImageJ: req.body.ImageJ,
      htablex: req.body.htablex,
      htabley: req.body.htabley,
      submittedBy: req.employee.name,
      submittedByEmail: req.employee.email,
      submittedAt: new Date(),
      rating: 0,
      numReviews: 0,
      verifiedBy: '',
      verifiededAt: '',
      img: '',
      // customerLogo: '/images/sample_logo.png',
    });
    const survey = await newSurvey.save();
    res.send({ message: 'New Survey Created', survey });
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
