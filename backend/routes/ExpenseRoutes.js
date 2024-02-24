import express from 'express';
import cron from 'node-cron';
import expressAsyncHandler from 'express-async-handler';
import { Sequelize, Op } from 'sequelize';
import {
  generateToken,
  baseUrl,
  isAuth,
  isAdmin,
  isSuperAdmin,
} from '../utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { DaywiseExpense, EmployeeExpense } from '../models/expenseModels.js';

const expenseRouter = express.Router();

dotenv.config();

expenseRouter.get('/', async (req, res) => {
  try {
    // Include daywise expenses in the result
    const expenses = await EmployeeExpense.findAll({
      include: DaywiseExpense,
    });

    // Send the created employees as the response
    res.send({ expenses });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

expenseRouter.get('/:expenseid', async (req, res) => {
  try {
    const { expenseid } = req.params;

    // Find the specific employee expense with the provided id
    const expense = await EmployeeExpense.findOne({
      where: { id: expenseid },
      include: DaywiseExpense,
    });

    if (!expense) {
      // If no expense found with the given id
      return res.status(404).send({ message: 'Expense not found' });
    }

    // Send the specific employee expense along with daywise expenses as the response
    res.send({ expense });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

expenseRouter.post('/', async (req, res) => {
  try {
    const { expense } = req.body;

    // Create EmployeeExpense
    const createdExpense = await EmployeeExpense.create({
      employeeName: expense.employeeName,
      employee_id: expense.employee_id,
      email: expense.email,
      sitename: expense.sitename,
      siteLocation: expense.siteLocation,
      startDate: expense.startDate,
      endDate: expense.endDate,
      status: expense.status,
      ApprovedBy: expense.ApprovedBy,
      ApprovedBy2: expense.ApprovedBy2,
      ApprovedAt: expense.ApprovedAt,
      AdvanceAmount: expense.AdvanceAmount,
      AdvanceAmountDate: expense.AdvanceAmountDate,
      Settled: expense.Settled,
      SettledBy: expense.SettledBy,
    });

    // Create DaywiseExpenses
    const daywiseExpenses = expense.DaywiseExpenses.map((daywise) => ({
      ...daywise,
      EmployeeExpenseId: createdExpense.id,
    }));

    const daywiseexpense = await DaywiseExpense.bulkCreate(daywiseExpenses);

    res.status(201).json({
      message: 'Expense created successfully',
      expense: createdExpense,
      daywiseexpense: daywiseexpense,
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default expenseRouter;
