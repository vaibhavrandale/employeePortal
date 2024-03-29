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
import Investment from '../models/Investment.js';
// import emoji from '../welcome_image.jpg';

const investmentRouter = express.Router();

dotenv.config();

// Investment

investmentRouter.get('/', async (req, res) => {
  try {
    const investment = await Investment.findAll();

    if (investment) {
      res.status(200).send({ investment });
    } else {
      res.status(404).send({
        message: `investments not found `,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

investmentRouter.get('/:employeeid', async (req, res) => {
  try {
    const { employeeid } = req.params;
    const investment = await Investment.findOne({
      where: { employee_id: employeeid },
    });

    if (investment) {
      res.status(200).send({ investment });
    } else {
      res.status(404).send({
        message: `Investment not found for Employee-${employeeid}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

investmentRouter.post('/:employeeid', async (req, res) => {
  const { employeeid } = req.params;

  // Check if an investment record already exists for the employee
  const existingInvestment = await Investment.findOne({
    where: { employee_id: employeeid },
  });

  if (existingInvestment) {
    return res.status(400).json({
      message: `Investment already exists for this employee-${employeeid}`,
    });
  }

  // Find the employee by ID
  const employee = await Employee.findOne({
    where: { employee_id: employeeid },
  });

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found.' });
  }

  const {
    Name,
    email,
    A_80C,
    A_80CC,
    B_80CCC,
    C_80CCD_1,
    D_80CCE,
    Regime,
    F_80CCD_2,
    submittedBy,
    submittedAt,
  } = req.body;

  try {
    // Create a new investment record
    const investment = await Investment.create({
      Name: Name,
      email: email,
      employee_id: employeeid,
      A_80C: A_80C,
      A_80CC: A_80CC,
      B_80CCC: B_80CCC,
      C_80CCD_1: C_80CCD_1,
      D_80CCE: D_80CCE,
      Regime: Regime,
      F_80CCD_2: F_80CCD_2,
      submittedBy: submittedBy,
      submittedAt: submittedAt,
    });

    return res.status(201).json({
      message: `Investment created successfully for ${employeeid}`,
      investment,
    });
  } catch (error) {
    console.error('Error while creating investment:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

export default investmentRouter;
