import express from 'express';
import data from './data.js';

const app = express();
app.get('/api/employees', (req, res) => {
  res.send(data.employees);
});

app.get('/api/leaves', (req, res) => {
  res.send(data.Leaves);
});

app.get('/api/siteDetails', (req, res) => {
  res.send(data.siteDetails);
});

app.get('/api/survey/:projectCode/:id', (req, res) => {
  const { projectCode, id: surveyId } = req.params;

  // Find the survey data based on project code and survey ID
  const survey = data.SiteSurvey.find(
    (site) => site.projectCode === projectCode && site.surveyId === surveyId
  );

  res.send(survey);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
