import express from 'express';
import Employee from '../models/employeeModel.js';
import data from '../data.js';
import Sites from '../models/siteDetailsModel.js';
import Survey from '../models/surveyModel.js';
import Notice from '../models/noticeModel.js';
import Attendance from '../models/AttendanceModel.js';
import BirthdayWish from '../models/BirthdayWish.js';
import AttendanceRecord from '../models/AttendanceRecord.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Employee.deleteMany({}); // Remove all existing documents from the Employee collection
  const createdEmployees = await Employee.insertMany(data.employees);

  await Sites.deleteMany({});
  const creatdsiteDetails = await Sites.insertMany(data.siteDetails);

  await Survey.deleteMany({});
  const creatdSiteSurvey = await Survey.insertMany(data.SiteSurvey);

  await Notice.deleteMany({});
  const CreatedNotice = await Notice.insertMany(data.notices);

  await Attendance.deleteMany({});
  const CreatedAttendance = await Attendance.insertMany(data.attendanceData);
  await AttendanceRecord.deleteMany({});
  const CreatedattendanceRecord = await AttendanceRecord.insertMany(
    data.AttendanceRecord
  );

  await BirthdayWish.deleteMany({});
  const CreatedBirthdayWish = await BirthdayWish.insertMany(data.birthdayWish);
  // Send the created employees as the response
  res.send({
    createdEmployees,
    creatdsiteDetails,
    creatdSiteSurvey,
    CreatedNotice,
    CreatedAttendance,
    CreatedBirthdayWish,
    CreatedattendanceRecord,
  });
});

export default seedRouter;
