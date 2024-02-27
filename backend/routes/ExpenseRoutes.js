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
import { DaywiseExpenses, EmployeeExpense } from '../models/expenseModels.js';

const expenseRouter = express.Router();

dotenv.config();

expenseRouter.get('/', async (req, res) => {
  try {
    // Include daywise expenses in the result
    const expenses = await EmployeeExpense.findAll({
      include: DaywiseExpenses,
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
      include: DaywiseExpenses,
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

expenseRouter.post('/new-expense', async (req, res) => {
  try {
    const {
      employeeName,
      employee_id,
      email,
      sitename,
      siteLocation,
      startDate,
      endDate,
      status,
      ApprovedBy,
      ApprovedBy2,
      ApprovedAt,
      AdvanceAmount,
      AdvanceAmountDate,
      Settled,
      SettledBy,
      daywiseExpenses, // Corrected variable name
    } = req.body;

    // Create EmployeeExpense
    const createdExpense = await EmployeeExpense.create({
      employeeName,
      employee_id,
      email,
      sitename,
      siteLocation,
      startDate,
      endDate,
      status,
      ApprovedBy,
      ApprovedBy2,
      ApprovedAt,
      AdvanceAmount,
      AdvanceAmountDate,
      Settled,
      SettledBy,
    });

    // Create DaywiseExpenses
    const createddaywiseExpenses = daywiseExpenses.map((daywise) => ({
      // Corrected variable name
      ...daywise,
      EmployeeExpenseId: createdExpense.id,
    }));

    const daywiseexpense = await DaywiseExpenses.bulkCreate(
      createddaywiseExpenses
    );

    res.status(201).json({
      message: 'Expense created successfully',
      expense: createdExpense,
      daywiseExpenses: daywiseexpense,
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

expenseRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const expenseId = req.params.id;

      // Find the expense by ID
      const expenseToDelete = await EmployeeExpense.findByPk(expenseId);

      if (!expenseToDelete) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      // Delete the associated daywise expenses first (if any)
      await DaywiseExpenses.destroy({
        where: {
          EmployeeExpenseId: expenseToDelete.id,
        },
      });

      // Delete the main expense record
      await EmployeeExpense.destroy({
        where: {
          id: expenseToDelete.id,
        },
      });

      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      console.error('Error deleting expense:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
);

//individual expenses
expenseRouter.get('/getall/:employeeid', async (req, res) => {
  try {
    const { employeeid } = req.params;

    const expenses = await EmployeeExpense.findAll({
      where: { employee_id: employeeid },
      include: DaywiseExpenses,
    });

    // console.log(expenses);

    if (expenses.length === 0) {
      // If no expense found with the given id
      return res.status(404).send({ message: 'Expense not found' });
    }

    // Send the specific employee expense along with daywise expenses as the response
    res.send({ expenses });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

//update expense

expenseRouter.put('/update-expense/:expenseId', async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    const {
      sitename,
      siteLocation,
      startDate,
      endDate,
      AdvanceAmount,
      AdvanceAmountDate,
      daywiseExpenses,
    } = req.body;

    const expenseFound = await EmployeeExpense.findByPk(expenseId);
    if (!expenseFound) {
      return res.status(404).json({ message: 'Expense Not Found' });
    }

    expenseFound.sitename = sitename;
    expenseFound.siteLocation = siteLocation;
    expenseFound.startDate = startDate;
    expenseFound.endDate = endDate;
    expenseFound.AdvanceAmount = AdvanceAmount;
    expenseFound.AdvanceAmountDate = AdvanceAmountDate;

    const updatedExpense = await expenseFound.save();

    // Delete existing day-wise expenses for the updated expense
    await DaywiseExpenses.destroy({
      where: {
        EmployeeExpenseId: expenseId,
      },
    });

    // Create new day-wise expenses
    const updatedDaywiseExpenses = daywiseExpenses.map((daywise) => ({
      ...daywise,
      EmployeeExpenseId: expenseId,
    }));

    const createdDaywiseExpensesData = await DaywiseExpenses.bulkCreate(
      updatedDaywiseExpenses
    );

    res.status(200).json({
      message: 'Expense updated successfully',
      expense: updatedExpense,
      daywiseExpenses: createdDaywiseExpensesData,
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

expenseRouter.put('/approve-expense-1/:expenseId', async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    const { status, ApprovedBy, ApprovedAt } = req.body;

    const expenseFound = await EmployeeExpense.findByPk(expenseId);
    if (!expenseFound) {
      return res.status(404).json({ message: 'Expense Not Found' });
    }

    expenseFound.status = status;
    expenseFound.ApprovedBy = ApprovedBy;
    expenseFound.ApprovedAt = ApprovedAt;

    const updatedExpense = await expenseFound.save();

    res.status(200).json({
      message: 'Expense Approved to level-1 successfully',
      expense: updatedExpense,
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

expenseRouter.put('/approve-expense-2/:expenseId', async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    const { status, ApprovedBy2, ApprovedAt } = req.body;

    const expenseFound = await EmployeeExpense.findByPk(expenseId);
    if (!expenseFound) {
      return res.status(404).json({ message: 'Expense Not Found' });
    }

    expenseFound.status = status;
    expenseFound.ApprovedBy2 = ApprovedBy2;
    expenseFound.ApprovedAt = ApprovedAt;

    const updatedExpense = await expenseFound.save();

    res.status(200).json({
      message: 'Expense Approved to level-2 successfully',
      expense: updatedExpense,
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

expenseRouter.put('/settle-expense/:expenseId', async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    const { status, SettledBy, Settled } = req.body;

    const expenseFound = await EmployeeExpense.findByPk(expenseId);
    if (!expenseFound) {
      return res.status(404).json({ message: 'Expense Not Found' });
    }

    expenseFound.status = status;
    expenseFound.SettledBy = SettledBy;
    expenseFound.Settled = Settled;

    const updatedExpense = await expenseFound.save();

    res.status(200).json({
      message: 'Expense Settled successfully',
      expense: updatedExpense,
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default expenseRouter;
