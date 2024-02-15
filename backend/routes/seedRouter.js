// import express from 'express';
// import Employee from '../models/employeeModel.js';
// import data from '../data.js';
// import Sites from '../models/siteDetailsModel.js';
// import Survey from '../models/surveyModel.js';
// import Notice from '../models/noticeModel.js';
// import Attendance from '../models/AttendanceModel.js';
// import BirthdayWish from '../models/BirthdayWish.js';
// import AttendanceRecord from '../models/AttendanceRecord.js';

// const seedRouter = express.Router();

// seedRouter.get('/', async (req, res) => {
//   await Employee.deleteMany({}); // Remove all existing documents from the Employee collection
//   const createdEmployees = await Employee.insertMany(data.employees);

//   await Sites.deleteMany({});
//   const creatdsiteDetails = await Sites.insertMany(data.siteDetails);

//   await Survey.deleteMany({});
//   const creatdSiteSurvey = await Survey.insertMany(data.SiteSurvey);

//   await Notice.deleteMany({});
//   const CreatedNotice = await Notice.insertMany(data.notices);

//   await Attendance.deleteMany({});
//   const CreatedAttendance = await Attendance.insertMany(data.attendanceData);
//   await AttendanceRecord.deleteMany({});
//   const CreatedattendanceRecord = await AttendanceRecord.insertMany(
//     data.AttendanceRecord
//   );

//   await BirthdayWish.deleteMany({});
//   const CreatedBirthdayWish = await BirthdayWish.insertMany(data.birthdayWish);
//   // Send the created employees as the response
//   res.send({
//     createdEmployees,
//     creatdsiteDetails,
//     creatdSiteSurvey,
//     CreatedNotice,
//     CreatedAttendance,
//     CreatedBirthdayWish,
//     CreatedattendanceRecord,
//   });
// });

// export default seedRouter;

import express from 'express';
import { Op } from 'sequelize';
import Employee from '../models/employeeModel.js';
import Notice from '../models/noticeModel.js';
import data from '../data.js';
import Leaves from '../models/LeaveModel.js';
import AttendanceRecord from '../models/AttendanceRecord.js';
import RfidReg from '../models/RfidReg.js';
import RfidCkeck from '../models/RfidCkeck.js';
import Payslip from '../models/Payslip.js';
import Anniversary from '../models/Anniversary.js';
import Holidays from '../models/Holidays.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Remove all existing records from the Employee table
    await Employee.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Employee.destroy({ where: {}, truncate: true });
    await Employee.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Notice.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Notice.destroy({ where: {}, truncate: true });
    await Notice.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Leaves.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Leaves.destroy({ where: {}, truncate: true });
    await Leaves.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await AttendanceRecord.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await AttendanceRecord.destroy({ where: {}, truncate: true });
    await AttendanceRecord.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await RfidReg.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await RfidReg.destroy({ where: {}, truncate: true });
    await RfidReg.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await RfidCkeck.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await RfidCkeck.destroy({ where: {}, truncate: true });
    await RfidCkeck.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Payslip.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Payslip.destroy({ where: {}, truncate: true });
    await Payslip.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Anniversary.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Anniversary.destroy({ where: {}, truncate: true });
    await Anniversary.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Holidays.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Holidays.destroy({ where: {}, truncate: true });
    await Holidays.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Insert data into the Employee table
    const createdEmployees = await Employee.bulkCreate(data.employees);
    const createdNotices = await Notice.bulkCreate(data.notices);
    const createdLeaves = await Leaves.bulkCreate(data.Leaves);
    const createdAttendanceRecord = await AttendanceRecord.bulkCreate(
      data.AttendanceRecord
    );
    const createdRfidReg = await RfidReg.bulkCreate(data.RfidReg);
    const createdRfidCkeck = await RfidCkeck.bulkCreate(data.RfidCkeck);
    const createdPayslip = await Payslip.bulkCreate(data.Payslip);
    const createdAnniversary = await Anniversary.bulkCreate(data.Anniversary);
    const createdHolidays = await Holidays.bulkCreate(data.holidays);

    res.send({
      createdEmployees,
      createdNotices,
      createdLeaves,
      createdAttendanceRecord,
      createdRfidReg,
      createdRfidCkeck,
      createdPayslip,
      createdAnniversary,
      createdHolidays,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default seedRouter;
