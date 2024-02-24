import express from 'express';
import cron from 'node-cron';
import Employee from '../models/employeeModel.js';
import expressAsyncHandler from 'express-async-handler';
import moment from 'moment-timezone';
import { format } from 'date-fns'; // Import format from date-fns
import BirthdayWish from '../models/BirthdayWish.js';
import { Sequelize, Op } from 'sequelize';

// import bcrypt from 'bcryptjs';
import {
  generateToken,
  baseUrl,
  isAuth,
  isAdmin,
  isSuperAdmin,
} from '../utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
import AttendanceRecord from '../models/AttendanceRecord.js';
import Payslip from '../models/Payslip.js';
// import emoji from '../welcome_image.jpg';

const payslipRouter = express.Router();

dotenv.config();

payslipRouter.get('/:id', async (req, res) => {
  try {
    const employeeid = req.params.id;
    const payslip = await Payslip.findAll({
      where: { employee_id: employeeid },
    });

    if (payslip) {
      res.send({ payslip });
    } else {
      res.status(404).send({ message: 'Payslip not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

payslipRouter.get('/', async (req, res) => {
  try {
    const payslip = await Payslip.findAll();

    if (payslip) {
      res.status(200).send({ payslip });
    } else {
      res.status(404).send({ message: 'Payslip not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

payslipRouter.get('/:employeeid/:id', async (req, res) => {
  try {
    const { employeeid, id } = req.params;
    const payslip = await Payslip.findOne({
      where: { employee_id: employeeid, id: id },
    });

    if (payslip) {
      res.send(payslip);
    } else {
      res.status(404).send({ message: 'Payslip not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// --------update employee-------------------------
payslipRouter.put('/updatepayslip/:employeeid/:id', async (req, res) => {
  const { employeeid, id } = req.params;
  const { ctc, salarygroup } = req.body;

  const basic = ((ctc / 12) * (45 / 100)).toFixed(2);
  const hra = ((basic * 40) / 100).toFixed(2);
  const conveyance = (1600).toFixed(2);
  const medical = (1250).toFixed(2);
  const special = (basic - hra - conveyance - medical).toFixed(2);

  const esi =
    salarygroup === 8 && gross <= 21000 ? ((gross * 1.75) / 100).toFixed(2) : 0;

  const pf = Math.min((basic * 12) / 100, 1800);

  const pt = 200;

  // Ensure that pf and pt are numeric values before using toFixed
  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const totaldeduction =
    isNumeric(pf) && isNumeric(pt) ? (pf + pt).toFixed(2) : 'N/A';

  const gross = (ctc / 12).toFixed(2);
  const netsalary = (gross - totaldeduction).toFixed(2);
  const employerpf = ((basic * 13) / 100).toFixed(2);
  const employeresi = ((basic * 4.25) / 100).toFixed(2);
  const bonus = ((basic * 8.33) / 100).toFixed(2);

  try {
    // Find the employee by ID
    const payslip = await Payslip.findOne({
      where: { employee_id: employeeid, id: id },
    });

    if (!payslip) {
      return res.status(404).json({ message: 'Payslip not found.' });
    }
    payslip.basic = basic;
    payslip.ctc = ctc;
    payslip.salarygroup = salarygroup;
    payslip.hra = hra;
    payslip.conveyance = conveyance;
    payslip.medical = medical;
    payslip.special = special;
    payslip.pt = pt;
    payslip.pf = pf;
    payslip.esi = esi;
    payslip.total_deduction = totaldeduction;
    payslip.gross = gross;
    payslip.netsalary = netsalary;
    payslip.employer_pf = employerpf;
    payslip.employer_esi = employeresi;
    payslip.bonus = bonus;

    // Save the updated employee document
    await payslip.save();

    return res.status(201).json({
      message: `Salary updated successfully for ${employeeid} `,
      payslip,
    });
  } catch (error) {
    console.error('Error while updating Employee:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

payslipRouter.post('/createpayslip/:employeeid', async (req, res) => {
  const { employeeid } = req.params;
  // Find the employee by ID
  const employee = await Employee.findOne({
    where: { employee_id: employeeid },
  });

  if (!employee) {
    return res.status(404).json({ message: 'employee not found.' });
  }
  const { ctc, salarygroup, month, year } = req.body;
  const basic = ((ctc / 12) * (45 / 100)).toFixed(2);
  const hra = ((basic * 40) / 100).toFixed(2);
  const conveyance = (1600).toFixed(2);
  const medical = (1250).toFixed(2);
  const special = (basic - hra - conveyance - medical).toFixed(2);

  const esi =
    salarygroup === 8 && gross <= 21000 ? ((gross * 1.75) / 100).toFixed(2) : 0;

  const pf = Math.min((basic * 12) / 100, 1800);

  const pt = 200;

  // Ensure that pf and pt are numeric values before using toFixed
  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const totaldeduction =
    isNumeric(pf) && isNumeric(pt) ? (pf + pt).toFixed(2) : 'N/A';

  const gross = (ctc / 12).toFixed(2);
  const netsalary = (gross - totaldeduction).toFixed(2);
  const employerpf = ((basic * 13) / 100).toFixed(2);
  const employeresi = ((basic * 4.25) / 100).toFixed(2);
  const bonus = ((basic * 8.33) / 100).toFixed(2);

  try {
    // Create a new payslip
    const payslip = await Payslip.create({
      email: employee.email,
      NAME: employee.NAME,
      employee_id: employeeid,
      ctc: ctc,
      salarygroup: salarygroup,
      month: month,
      year: year,
      basic: basic,
      hra: hra,
      conveyance: conveyance,
      medical: medical,
      special: special,
      pt: pt,
      pf: pf,
      esi: esi,
      total_deduction: totaldeduction,
      gross: gross,
      netsalary: netsalary,
      employer_pf: employerpf,
      employer_esi: employeresi,
      bonus: bonus,
    });

    return res.status(201).json({
      message: `Payslip created successfully for ${employeeid}`,
      payslip,
    });
  } catch (error) {
    console.error('Error while creating Payslip:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

payslipRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const payslip = await Payslip.findByPk(req.params.id);

      if (payslip) {
        await payslip.destroy(); // Use destroy for soft delete
        res.send({ message: `Payslip Deleted for month ${payslip.month}` });
      } else {
        res.status(404).send({ message: 'Payslip not found' });
      }
    } catch (error) {
      console.error('Error deleting payslip:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  })
);

payslipRouter.get(
  '/specificemployee/:employeeid/:year/:month',
  async (req, res) => {
    try {
      const { employeeid, year, month } = req.params;
      const payslip = await Payslip.findOne({
        where: { employee_id: employeeid, year: year, month: month },
      });

      if (payslip) {
        res.status(200).send({ payslip });
      } else {
        res.status(404).send({
          message: `Payslip not found for month :${month} and year : ${year}`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
);

payslipRouter.get(
  '/getspecificmonthpayslips/:year/:month',
  async (req, res) => {
    try {
      const { year, month } = req.params;

      const payslip = await Payslip.findAll({
        where: { year: year, month: month },
      });

      if (payslip) {
        res.status(200).send(payslip);
      } else {
        res.status(404).send({
          message: `Payslip not found for month: ${month}`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
);

export default payslipRouter;
