import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';
import path from 'path';
import emplyeeRouter from './routes/employeeRoutes.js';
import surveyRouter from './routes/surveyRoutes.js';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);

app.use('/api/employees', emplyeeRouter);

app.use('/api/survey', surveyRouter);

app.get('/api/leaves', (req, res) => {
  res.send(data.Leaves);
});

// app.get('/api/siteDetails', (req, res) => {
//   res.send(data.siteDetails);
// });

// app.get('/api/survey/:projectCode/:id', (req, res) => {
//   const { projectCode, id: surveyId } = req.params;

//   // Find the survey data based on project code and survey ID
//   const survey = data.SiteSurvey.find(
//     (site) => site.projectCode === projectCode && site.surveyId === surveyId
//   );

//   if (survey) {
//     res.send(survey);
//   } else {
//     res.status(404).send({ message: 'Survey not found' });
//     // console.log(survey);
//   }
// });

// app.get('/api/sitelist/:projectCode', (req, res) => {
//   const { projectCode } = req.params;

//   // Find the survey data based on project code and survey ID
//   const SiteFound = data.SiteSurvey.find(
//     (site) => site.projectCode === projectCode
//   );

//   if (SiteFound) {
//     res.send(SiteFound);
//   } else {
//     res.status(404).send({ message: 'Site not found' });
//     // console.log(survey);
//   }
// });

// -----------------------------------------
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// -----------------------------------------

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
