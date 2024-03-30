import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import mysql from 'mysql2';
import sequelize from './config/database.js';
import cors from 'cors';
import multer from 'multer';
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
  calculateTotalHoursForToday,
  sendWomensDayEmail,
  sendWomensEmail,
  createSundayAttendance,
} from './cron.js';
import cron from 'node-cron';
import leaveRouter from './routes/LeaveRouter.js';
import payslipRouter from './routes/payslipRoutes.js';
import holidayRouter from './routes/holidayRoutes.js';
import PolicyRouter from './routes/policyRoutes.js';
import assetsRouter from './routes/assetRoutes.js';
// import morgan from 'morgan';
import pdf from './models/pdf.js';
import expenseRouter from './routes/ExpenseRoutes.js';
import CronJobRouter from './routes/cronJobRoutes.js';
import accessRouter from './routes/accessRoutes.js';
import UIDCardRouter from './routes/UidCardRoutes.js';
import scopeofworkRouter from './routes/salesRoutes.js';
import investmentRouter from './routes/investmentRoutes.js';
import lapseleaveRouter from './routes/LapseLeaves.js';
import jobRouter from './routes/jobRoutes.js';

dotenv.config();
// Sync the Sequelize model with the database
sequelize.sync();

const app = express();
app.use(cors());
app.use(express.json());

// app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static('files'));

// Schedule the job
cron.schedule('30 1 * * *', sendBirthdayEmails);

cron.schedule('30 1 * * *', checkAndCreateBirthdayRecords);

cron.schedule('30 1 * * *', AnniversaryEmails);

cron.schedule('0 0 2 * *', PayslipGenerator);

cron.schedule('30 2 * * *', ProbationChecker);

cron.schedule('30 2 * * *', processLeavesAndCreateRefidChecks);

cron.schedule('30 0 * * *', HolidayGenerator);

cron.schedule('30 14 * * *', calculateTotalHoursForToday);

cron.schedule('0 0 * * 0', createSundayAttendance);

// cron.schedule('30 1 * * *', sendWomensDayEmail);
//
// cron.schedule('* * * * *', calculateTotalHoursForToday);
// cron.schedule('* * * * *', HolidayGenerator);
// cron.schedule('* * * * *', processLeavesAndCreateRefidChecks);
// cron.schedule('* * * * *', ProbationChecker);
// cron.schedule('* * * * *', PayslipGenerator);
// cron.schedule('* * * * *', AnniversaryEmails);
// cron.schedule('* * * * *', sendBirthdayEmails);
// cron.schedule('* * * * *', checkAndCreateBirthdayRecords);
// cron.schedule('* * * * *', sendWomensDayEmail);
// cron.schedule('* * * * *', sendWomensEmail);
// cron.schedule('* * * * *', createSundayAttendance);

//Intern
// cron.schedule('* * * * *', Intern);

app.use('/api/seed', seedRouter);

app.use('/api/employees', emplyeeRouter);
app.use('/api/attendence', attendenceRouter);

app.use('/api/survey', surveyRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/notice', NoticeRouter);
app.use('/api/leaves', leaveRouter);
app.use('/api/lapaseleave', lapseleaveRouter);

app.use('/api/payslip', payslipRouter);
app.use('/api/holidays', holidayRouter);
app.use('/api/policy', PolicyRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/investment', investmentRouter);

app.use('/api/access', accessRouter);

app.use('/api/uid-update', UIDCardRouter);

app.use('/api/sales', scopeofworkRouter);

app.use('/api/jobs', jobRouter);

app.use('/api/expenses', expenseRouter);
app.use('/api/manual-trigger', CronJobRouter);

// ---------------upload----------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      return cb(null, true);
    }
    return cb(new Error('Invalid file type. Only PDF files are allowed.'));
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
  },
});

app.post('/uploadp', upload.single('file'), (req, res) => {
  try {
    const { title } = req.body;
    const { originalname: filename } = req.file;

    const newpdf = new pdf({ title, filename });
    // Store information in the database
    const uploadedPdf = newpdf.save();

    res
      .status(200)
      .json({ message: 'File uploaded successfully', data: uploadedPdf });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-files', async (req, res) => {
  try {
    pdf.findAll({}).then((data) => {
      res.status(200).send({ data });
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching files:', error.message);
    res.status(500).send({ status: 'error', message: 'Internal Server Error' });
  }
});
app.delete('/files/:id', async (req, res) => {
  const deletedpdf = await pdf.findByPk(req.params.id);

  if (!deletedpdf) {
    res.status(404).send({ message: 'policy not found' });
    return;
  }
  // If the policy is not protected, delete them
  const policy = await deletedpdf.destroy();
  res.send({ message: 'policy Deleted', policy });
});

// ---------------upload----------------

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
