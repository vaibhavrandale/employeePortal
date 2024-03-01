import express from 'express';
import dotenv from 'dotenv';
import { sendBirthdayEmails } from '../cron.js';
import { checkAndCreateBirthdayRecords } from '../cron.js';
import {
  AnniversaryEmails,
  PayslipGenerator,
  ProbationChecker,
  processLeavesAndCreateRefidChecks,
  HolidayGenerator,
  calculateTotalHoursForToday,
} from '../cron.js';

const CronJobRouter = express.Router();

dotenv.config();

CronJobRouter.post('/send-birthday-emails', async (req, res) => {
  try {
    // Execute the corresponding cron job
    await checkAndCreateBirthdayRecords();
    await sendBirthdayEmails();

    res.status(200).json({ message: 'Manual Birthday Email job triggered.' });
  } catch (error) {
    console.error('Error during Manual Birthday Email job execution:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

CronJobRouter.post('/anniversary-emails', async (req, res) => {
  try {
    // Execute the corresponding cron job
    await AnniversaryEmails();

    res
      .status(200)
      .json({ message: 'Manual Anniversary Email job triggered.' });
  } catch (error) {
    console.error(
      'Error during Manual Anniversary Email job execution:',
      error
    );
    res.status(500).json({ message: 'Internal server error.' });
  }
});

CronJobRouter.post('/payslip-generate', async (req, res) => {
  try {
    // Execute the corresponding cron job
    await PayslipGenerator();

    res.status(200).json({ message: 'Manual Payslip-Generate job triggered.' });
  } catch (error) {
    console.error('Error during Manual Payslip-Generate job execution:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

CronJobRouter.post('/probation-emails', async (req, res) => {
  try {
    // Execute the corresponding cron job
    await ProbationChecker();

    res.status(200).json({ message: 'Manual probation Email job triggered.' });
  } catch (error) {
    console.error('Error during Manual probation Email job execution:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

CronJobRouter.post(
  '/auto-leave-record-create-in-rfidcheck',
  async (req, res) => {
    try {
      // Execute the corresponding cron job
      await processLeavesAndCreateRefidChecks();

      res.status(200).json({
        message: 'Manual leave-record-create-in-rfidcheck job triggered.',
      });
    } catch (error) {
      console.error(
        'Error during Manual leave-record-create-in-rfidcheck job execution:',
        error
      );
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);

CronJobRouter.post('/paid-holiday-generator', async (req, res) => {
  try {
    // Execute the corresponding cron job
    await HolidayGenerator();

    res.status(200).json({
      message: 'Manual paid holiday-generated job triggered.',
    });
  } catch (error) {
    console.error(
      'Error during Manual paid holiday-generated job execution:',
      error
    );
    res.status(500).json({ message: 'Internal server error.' });
  }
});

CronJobRouter.post('/calculate-total-hours-for-today', async (req, res) => {
  try {
    // Execute the corresponding cron job
    await calculateTotalHoursForToday();

    res.status(200).json({
      message: 'Manual calculate Total Hours For Today job triggered.',
    });
  } catch (error) {
    console.error(
      'Error during Manual calculate Total Hours For Toda job execution:',
      error
    );
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default CronJobRouter;
