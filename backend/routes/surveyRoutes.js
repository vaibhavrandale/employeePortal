import express, { request } from 'express';
import Survey from '../models/surveyModel.js';
import Sites from '../models/siteDetailsModel.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import { baseUrl } from '../utils.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
const surveyRouter = express.Router();

dotenv.config();
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
      plantLayout: '',
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
      site.plantLayout = req.body.plantLayout;
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

const logo =
  'https://taypro.in/assets/images/taypro-registered-without-tagline-354x82.png';
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
    // const SurveyId = survey.surveyId;
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

      // Create a transporter object using Yandex SMTP
      const transporter = nodemailer.createTransport({
        service: 'Yandex', // Use the Yandex service
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL PORTAL <${process.env.MAIL_USER}>`,
          to: `<${email}>`,
          subject: 'A New Remark has been Added!',
          html: `
        
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Content</title>
        <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: #ffffff;
          padding-left: 70px;
          padding-right: 70px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: start;
        }
        .image-content {
          text-align: center;
        }
        img {
          width: 100px;
          height: 100px;
          object-fit: contain;
          display: flex;
          justify-content: start;
        }
        .main-content {
          margin: 20px 0px;
        }
        
        .main-content a {
          display: flex;
          justify-content: center;
          padding: 10px;
          text-decoration: none;
          background: rgb(94, 223, 94);
          width: 130px;
          color: #f5f5f5;
          border-radius: 3px;
        
          /* margin: auto; */
         
        }
        
        .main-content a:hover {
          background: rgb(76, 214, 71);
        }
        .footer {
          font-size: 12px;
          text-align: center;
        }
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
          margin:10px;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
        
        </style>
    </head>
    <body>
    <div class="container">
    <div class="header">
      <h2>
        <img src=${logo} alt="Notice Seal" />
      </h2>
      <p>Hello, <b>${creatorName}</b> A new Remark has been added to your survey by <b style="color: green;">${Name}</b>.</p>
    </div>
    <div class="main-content">
    <table>
  <tr>
    <th>Project Code</th>
    <th>Survey Id</th>
    <th>Remark</th>
  </tr>
  <tr>
    <td>${projectCode}</td>
    <td> ${id}</td>
    <td> ${review.remark}</td>
  </tr>
</table>
    
    <a href="${baseUrl()}/survey/${id}" style="background:lime; color:black; padding:5px; text-decoration:none ;margin-left:10px;">View Survey</a>
    </div>
    <div class="footer">
      <p>This is an auto-generated email. Please do not reply.</p>
    </div>
  </div>
    </body>
        `,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
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

// // -----------------old---------------------
// surveyRouter.post(
//   '/sitesurveys/:projectCode',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const projectCode = req.params.projectCode;
//     const newSurvey = new Survey({
//       projectCode: projectCode,
//       block: req.body.block,
//       surveyId: 'taypro' + Date.now(),
//       row: req.body.row,
//       table: req.body.table,
//       structure: req.body.structure,
//       A: req.body.A,
//       ImageA: req.body.ImageA,
//       B: req.body.B,
//       ImageB: req.body.ImageB,
//       C: req.body.C,
//       ImageC: req.body.ImageC,
//       D: req.body.D,
//       ImageD: req.body.ImageD,
//       E: req.body.E,
//       ImageE: req.body.ImageE,
//       F: req.body.F,
//       ImageF: req.body.ImageF,
//       G: req.body.G,
//       ImageG: req.body.ImageG,
//       H: req.body.H,
//       ImageH: req.body.ImageH,
//       I: req.body.I,
//       ImageI: req.body.ImageI,
//       J: req.body.J,
//       ImageJ: req.body.ImageJ,
//       htablex: req.body.htablex,
//       htabley: req.body.htabley,
//       submittedBy: req.employee.name,
//       submittedByEmail: req.employee.email,
//       submittedAt: new Date(),
//       rating: 0,
//       numReviews: 0,
//       verifiedBy: '',
//       verifiededAt: '',
//       img: '',
//       // customerLogo: '/images/sample_logo.png',
//     });
//     const survey = await newSurvey.save();
//     res.send({ message: 'New Survey Created', survey });
//   })
// );

//-------------------old---------------------

// -----------------------------new---------------------------
surveyRouter.post(
  '/sitesurveys/:projectCode',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const projectCode = req.params.projectCode;
    // Initialization
    let hArray = req.body.H || [];
    let imageHArray = req.body.ImageH || [];
    let htablexArray = req.body.htablex || [];
    let htableyArray = req.body.htabley || [];

    if (req.body.table && (!req.body.H || !req.body.H.length)) {
      // Only fill with empty strings if there's no provided 'H' in the request body
      const length = req.body.table - 1;
      hArray = new Array(length).fill('');
      imageHArray = new Array(length).fill('');
      htablexArray = new Array(length).fill('');
      htableyArray = new Array(length).fill('');
    }
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
      H: hArray,
      ImageH: imageHArray,
      htablex: htablexArray,
      htabley: htableyArray,
      I: req.body.I,
      ImageI: req.body.ImageI,
      J: req.body.J,
      ImageJ: req.body.ImageJ,

      submittedBy: req.employee.name,
      submittedByEmail: req.employee.email,
      submittedAt: new Date(),
      rating: 0,
      numReviews: 0,
      verifiedBy: '',
      verifiededAt: '',
      img: '',
      // customerLogo: '/images/sample_logo.png',
      versions: [],
    });

    const survey = await newSurvey.save();
    res.send({ message: 'New Survey Created', survey });
  })
);

// -----------------------------new---------------------------

// ----------------put old----------------------------
// surveyRouter.put(
//   '/sitesurveys/:id',
//   isAuth,
//   isAdmin,

//   expressAsyncHandler(async (req, res) => {
//     const surveyid = req.params.id;

//     // Find the survey by ID and project code
//     const survey = await Survey.findById(surveyid);
//     // console.log(survey);
//     if (survey) {
//       survey.surveyId = req.body.surveyId;
//       survey.block = req.body.block;
//       survey.row = req.body.row;
//       survey.table = req.body.table;
//       survey.structure = req.body.structure;
//       survey.A = req.body.A;
//       survey.ImageA = req.body.ImageA;
//       survey.B = req.body.B;
//       survey.ImageB = req.body.ImageB;
//       survey.C = req.body.C;
//       survey.ImageC = req.body.ImageC;
//       survey.D = req.body.D;
//       survey.ImageD = req.body.ImageD;
//       survey.E = req.body.E;
//       survey.ImageE = req.body.ImageE;
//       survey.F = req.body.F;
//       survey.ImageF = req.body.ImageF;
//       survey.G = req.body.G;
//       survey.ImageG = req.body.ImageG;
//       survey.H = req.body.H;
//       survey.ImageH = req.body.ImageH;
//       survey.I = req.body.I;
//       survey.ImageI = req.body.ImageI;
//       survey.J = req.body.J;
//       survey.ImageJ = req.body.ImageJ;
//       survey.htablex = req.body.htablex;
//       survey.htabley = req.body.htabley;
//       // Set the submittedBy field to the logged-in user's name
//       survey.submittedBy = req.employee.name; // Assuming the user's name is available in req.user
//       // Set the submittedAt field to the current date and time
//       survey.submittedAt = new Date();
//       survey.img = req.body.img;
//       survey.status = req.body.status;
//       survey.images = req.body.images;
//       survey.verifiedBy = req.employee.name;
//       survey.verifiededAt = new Date();

//       // Save the updated survey
//       const updatedSurvey = await survey.save();
//       // res.status(200).json(UpdatedSurvey);
//       res.status(200).json(updatedSurvey);
//     } else {
//       res.status(404).send({ message: 'Survey Not Found' });
//     }
//   })
// );

// -----------------------------put  old----------------------------

// ----------------------new put------------------------
// Update an existing survey and handle version history
surveyRouter.put(
  '/sitesurveys/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    // Find the survey by ID
    const survey = await Survey.findById(surveyId);

    if (survey) {
      // Capture the current survey data for version history
      const currentData = survey.toObject();

      // Set the updated data from the request body
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

      // Handle filling with empty strings if 'H' is not provided
      if (req.body.table && (!req.body.H || !req.body.H.length)) {
        const length = req.body.table - 1;
        survey.H = new Array(length).fill('');
        survey.ImageH = new Array(length).fill('');
        survey.htablex = new Array(length).fill('');
        survey.htabley = new Array(length).fill('');
      } else {
        survey.H = req.body.H;
        survey.ImageH = req.body.ImageH;
        survey.htablex = req.body.htablex;
        survey.htabley = req.body.htabley;
      }

      // Create a new version object
      const newVersion = {
        versionNumber: survey.versions.length + 1,
        editedBy: req.employee.name,
        editedAt: new Date(),
        editedData: currentData, // Capture the original data
      };

      // Push the new version to the survey's version history
      survey.versions.push(newVersion);

      // Set the submittedBy field to the logged-in user's name
      survey.submittedBy = req.employee.name;
      // Set the submittedAt field to the current date and time
      survey.submittedAt = new Date();
      // Set other fields as needed...

      // Save the updated survey
      const updatedSurvey = await survey.save();

      // Return the updated survey
      res.status(200).json(updatedSurvey);
    } else {
      res.status(404).send({ message: 'Survey Not Found' });
    }
  })
);

// ----------get-survey-version-----------------------
surveyRouter.get('/sitesurveys/version/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Find the survey by ID
    const survey = await Survey.findById(id);

    if (survey) {
      // Fetch the survey's versions
      const versions = survey.versions;
      res.send({ versions });
    } else {
      res.status(404).send({ message: 'Survey not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch survey versions', error });
  }
});

// ----------get-survey-version-----------------------

// ----------------------new put------------------------

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

// ---------------------delete survey-------------------
surveyRouter.delete(
  '/sitesurveys/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const survey = await Survey.findById(req.params.id);
    if (survey) {
      await survey.deleteOne();
      res.send({ message: 'survey Deleted' });
    } else {
      res.status(404).send({ message: 'survey not found' });
    }
  })
);

surveyRouter.delete(
  '/sites/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const site = await Sites.findById(req.params.id);
    if (site) {
      await site.deleteOne();
      res.send({ message: 'Site Deleted' });
    } else {
      res.status(404).send({ message: 'site not found' });
    }
  })
);

export default surveyRouter;
