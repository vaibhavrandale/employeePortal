import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';
import path from 'path';

import emplyeeRouter from './routes/employeeRoutes.js';
import surveyRouter from './routes/surveyRoutes.js';
import uploadRouter from './routes/uploadRoute.js';
import EventRouter from './routes/eventRoutes.js';

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
app.use('/api/upload', uploadRouter);
app.use('/api/calendar', EventRouter);

app.get('/api/leaves', (req, res) => {
  res.send(data.Leaves);
});

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
