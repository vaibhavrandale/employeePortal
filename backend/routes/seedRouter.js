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
import EmployeeAssets from '../models/EmployeeAssets.js';
import { DaywiseExpenses, EmployeeExpense } from '../models/expenseModels.js';
import Access from '../models/AccessModel.js';
import UIDCard from '../models/UIDCard.js';
import ScopeofWork from '../models/ScopeofWork.js';
import RaiseInvoice from '../models/RaiseInvoice.js';

const seedRouter = express.Router();

seedRouter.get('/abcdefgh/0987654321', async (req, res) => {
  try {
    // Remove all existing records from the Employee table
    // await Employee.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    // await Employee.destroy({ where: {}, truncate: true });
    // await Employee.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Notice.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Notice.destroy({ where: {}, truncate: true });
    await Notice.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Leaves.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Leaves.destroy({ where: {}, truncate: true });
    await Leaves.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await AttendanceRecord.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await AttendanceRecord.destroy({ where: {}, truncate: true });
    await AttendanceRecord.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // await RfidReg.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    // await RfidReg.destroy({ where: {}, truncate: true });
    // await RfidReg.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // await RfidCkeck.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    // await RfidCkeck.destroy({ where: {}, truncate: true });
    // await RfidCkeck.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // await Payslip.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    // await Payslip.destroy({ where: {}, truncate: true });
    // await Payslip.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Anniversary.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Anniversary.destroy({ where: {}, truncate: true });
    await Anniversary.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await Holidays.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Holidays.destroy({ where: {}, truncate: true });
    await Holidays.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await EmployeeAssets.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await EmployeeAssets.destroy({ where: {}, truncate: true });
    await EmployeeAssets.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await EmployeeExpense.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await EmployeeExpense.destroy({ where: {}, truncate: true });
    await EmployeeExpense.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await DaywiseExpenses.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DaywiseExpenses.destroy({ where: {}, truncate: true });
    await DaywiseExpenses.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // await Access.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    // await Access.destroy({ where: {}, truncate: true });
    // await Access.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // await UIDCard.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    // await UIDCard.destroy({ where: {}, truncate: true });
    // await UIDCard.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await ScopeofWork.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await ScopeofWork.destroy({ where: {}, truncate: true });
    await ScopeofWork.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await RaiseInvoice.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await RaiseInvoice.destroy({ where: {}, truncate: true });
    await RaiseInvoice.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Insert data into the Employee table
    // const createdEmployees = await Employee.bulkCreate(data.employees);
    const createdNotices = await Notice.bulkCreate(data.notices);
    const createdLeaves = await Leaves.bulkCreate(data.Leaves);
    const createdAttendanceRecord = await AttendanceRecord.bulkCreate(
      data.AttendanceRecord
    );
    // const createdRfidReg = await RfidReg.bulkCreate(data.RfidReg);
    // const createdRfidCkeck = await RfidCkeck.bulkCreate(data.RfidCkeck);
    // const createdPayslip = await Payslip.bulkCreate(data.Payslip);
    const createdAnniversary = await Anniversary.bulkCreate(data.Anniversary);
    const createdHolidays = await Holidays.bulkCreate(data.holidays);
    const createdEmployeeAssets = await EmployeeAssets.bulkCreate(
      data.EmployeeAssets
    );

    const createdEmployeeExpense = await EmployeeExpense.bulkCreate(
      data.EmployeeExpense
    );
    const createdDaywiseExpense = await DaywiseExpenses.bulkCreate(
      data.DaywiseExpenses
    );

    // const createdAccess = await Access.bulkCreate(data.Access);
    // const createdUIDCard = await Access.bulkCreate(data.UIDCard);

    const createdScopeofWork = await ScopeofWork.bulkCreate(data.ScopeofWork);
    const createdRaiseInvoice = await RaiseInvoice.bulkCreate(
      data.RaiseInvoice
    );

    res.send({
      // createdEmployees,
      createdNotices,
      createdLeaves,
      createdAttendanceRecord,
      // createdRfidReg,
      // createdRfidCkeck,
      // createdPayslip,
      createdAnniversary,
      createdHolidays,
      createdEmployeeAssets,
      createdEmployeeExpense,
      createdDaywiseExpense,
      // createdAccess,
      createdScopeofWork,
      // createdUIDCard,
      createdRaiseInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default seedRouter;
