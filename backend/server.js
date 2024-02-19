import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import mysql from 'mysql2';
import sequelize from './config/database.js';

import seedRouter from './routes/seedRouter.js';
import path from 'path';
import emplyeeRouter from './routes/employeeRoutes.js';
import surveyRouter from './routes/surveyRoutes.js';
import uploadRouter from './routes/uploadRoute.js';
import NoticeRouter from './routes/noticeRoutes.js';
import attendenceRouter from './routes/attendenceRoutes.js';
import {
  checkAndCreateBirthdayRecords,
  sendBirthdayEmails,
  AnniversaryEmails,
  // Intern,
  PayslipGenerator,
  ProbationChecker,
  processLeavesAndCreateRefidChecks,
  HolidayGenerator,
} from './cron.js';
import cron from 'node-cron';
import leaveRouter from './routes/LeaveRouter.js';
import payslipRouter from './routes/payslipRoutes.js';
import holidayRouter from './routes/holidayRoutes.js';
import PolicyRouter from './routes/policyRoutes.js';

dotenv.config();
// Sync the Sequelize model with the database
sequelize.sync();
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('connected to DB');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// ------------------------------------------------------------------------------
// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'testdb',
// });

// connection.connect((err) => {
//   if (err) {
// console.error('Error connecting to MySQL database:', err);
//   } else {
//     console.log('Connected to MySQL database');
//   }
// });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Schedule the job
cron.schedule('30 2 * * *', sendBirthdayEmails);

cron.schedule('30 2 * * *', checkAndCreateBirthdayRecords);

cron.schedule('30 2 * * *', AnniversaryEmails);

cron.schedule('0 0 2 * *', PayslipGenerator);

cron.schedule('30 2 * * *', ProbationChecker);

cron.schedule('30 2 * * *', processLeavesAndCreateRefidChecks);

cron.schedule('30 2 * * *', HolidayGenerator);

// cron.schedule('* * * * *', HolidayGenerator);
// cron.schedule('* * * * *', processLeavesAndCreateRefidChecks);
// cron.schedule('* * * * *', ProbationChecker);
// cron.schedule('* * * * *', PayslipGenerator);
// cron.schedule('* * * * *', AnniversaryEmails);
// cron.schedule('* * * * *', sendBirthdayEmails);
// cron.schedule('* * * * *', checkAndCreateBirthdayRecords);

//Intern
// cron.schedule('* * * * *', Intern);

app.use('/api/seed', seedRouter);

app.use('/api/employees', emplyeeRouter);
app.use('/api/attendence', attendenceRouter);

app.use('/api/survey', surveyRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/notice', NoticeRouter);
app.use('/api/leaves', leaveRouter);
app.use('/api/payslip', payslipRouter);
app.use('/api/holidays', holidayRouter);
app.use('/api/policy', PolicyRouter);

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
