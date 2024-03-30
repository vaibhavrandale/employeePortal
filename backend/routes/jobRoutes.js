import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Sequelize, Op } from 'sequelize';
import { isAuth, isAdmin } from '../utils.js';
import dotenv from 'dotenv';
import Employee from '../models/employeeModel.js';
import JobOpening from '../models/JobOpening.js';
import JobReferal from '../models/JobReferal.js';

const jobRouter = express.Router();

dotenv.config();

jobRouter.get('/jobopening', async (req, res) => {
  // Insert new employee data using insertMany()
  const jobopening = await JobOpening.findAll();

  // Send the created employees as the response
  res.send({ jobopening });
});

jobRouter.get('/jobopening/:id', async (req, res) => {
  const jobid = req.params.id;
  const jobopening = await JobOpening.findOne({
    where: {
      JobID: jobid,
    },
  });
  if (jobopening) {
    // Send the created employees as the response
    res.status(200).send({ message: `jobopening found`, jobopening });
  } else {
    res
      .status(404)
      .send({ message: `No jobopening found with job-id: ${jobid}` });
  }
});

jobRouter.post(
  '/jobopening',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      JobID,
      JobDescription,
      EndDate,
      submittedBy,
      submittedAt,
      // description
    } = req.body;

    // Convert EndDate to DD/MM/YYYY format
    const endDateParts = EndDate.split('-');
    const formattedEndDate = `${endDateParts[2]}/${endDateParts[1]}/${endDateParts[0]}`;

    // Create a new asset with employee details
    const createdjobopening = new JobOpening({
      JobID,
      JobDescription,
      EndDate: formattedEndDate, // Save formatted end date
      submittedBy,
      submittedAt,
    });

    // Save the new asset
    const jobopening = await createdjobopening.save();

    res.send({ message: 'jobopening Created', jobopening });
  })
);

jobRouter.put('/jobopening/:id', async (req, res) => {
  const jobid = req.params.id;
  const { JobDescription, EndDate, submittedBy, submittedAt } = req.body;

  try {
    const foundjobopening = await JobOpening.findOne({
      where: {
        JobID: jobid,
      },
    });

    if (!foundjobopening) {
      return res
        .status(404)
        .json({ success: false, error: 'jobopening not found' });
    }

    foundjobopening.JobDescription = JobDescription;
    foundjobopening.EndDate = EndDate;
    foundjobopening.submittedBy = submittedBy;
    foundjobopening.submittedAt = submittedAt;

    const jobopening = await foundjobopening.save();

    res.send({ message: `jobopening ${jobid} updated`, jobopening });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

jobRouter.delete(
  '/jobopening/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const jobid = req.params.id;
    const foundjobopening = await JobOpening.findOne({
      where: {
        JobID: jobid,
      },
    });

    if (!foundjobopening) {
      res.status(404).send({ message: 'jobopening not found' });
      return;
    }
    // If the employee is not protected, delete them
    const jobopening = await foundjobopening.destroy();
    res.send({ message: 'jobopening Deleted', jobopening });
  })
);

// ---------------job referral-----------------------
jobRouter.get('/jobreferral', async (req, res) => {
  // Insert new employee data using insertMany()
  const jobreferral = await JobReferal.findAll();

  // Send the created employees as the response
  res.send({ jobreferral });
});

jobRouter.get('/jobreferral/:id', async (req, res) => {
  const jobid = req.params.id;
  const jobreferral = await JobReferal.findOne({
    where: {
      JobID: jobid,
    },
  });
  if (jobreferral) {
    // Send the created employees as the response
    res.status(200).send({ message: `jobreferral found`, jobreferral });
  } else {
    res
      .status(404)
      .send({ message: `No jobreferral found with job-id: ${jobid}` });
  }
});

jobRouter.get('/jobreferral/individual/:employeeid', async (req, res) => {
  const employeeid = req.params.employeeid;
  const jobreferral = await JobReferal.findAll({
    where: {
      refer_by_employee_employee_id: employeeid,
    },
  });
  if (jobreferral) {
    // Send the created employees as the response
    res.status(200).send({ message: `jobreferral found`, jobreferral });
  } else {
    res
      .status(404)
      .send({ message: `No jobreferral found with job-id: ${jobid}` });
  }
});

jobRouter.post(
  '/jobreferral',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      JobID,
      refer_employee_name,
      refer_employee_mobileno,
      refer_employee_email,
      refer_employee_adhaar_no,
      refer_employee_resume,
      profile_screened,
      profile_screenedBy,
      interview_scheduled,
      interview_completed,
      refer_employee_joined,
      refer_by_employee_name,
      refer_by_employee_email,
      refer_by_employee_employee_id,
      // description
    } = req.body;
    // Create a new asset with employee details
    const createdJobReferal = new JobReferal({
      JobID,
      refer_employee_name,
      refer_employee_mobileno,
      refer_employee_email,
      refer_employee_adhaar_no,
      refer_employee_resume,
      profile_screened,
      profile_screenedBy,
      interview_scheduled,
      interview_completed,
      refer_employee_joined,
      refer_by_employee_name,
      refer_by_employee_email,
      refer_by_employee_employee_id,
    });

    // Save the new asset
    const jobreferral = await createdJobReferal.save();

    res.send({ message: 'jobreferral Created', jobreferral });
  })
);

jobRouter.put('/jobreferral/:id', async (req, res) => {
  const jobid = req.params.id;
  const {
    JobID,
    refer_employee_name,
    refer_employee_mobileno,
    refer_employee_email,
    refer_employee_adhaar_no,
    refer_employee_resume,
  } = req.body;

  try {
    const foundJobReferal = await JobReferal.findOne({
      where: {
        JobID: jobid,
      },
    });

    if (!foundJobReferal) {
      return res
        .status(404)
        .json({ success: false, error: 'foundJobReferal not found' });
    }
    foundJobReferal.JobID = JobID;
    foundJobReferal.refer_employee_name = refer_employee_name;
    foundJobReferal.refer_employee_mobileno = refer_employee_mobileno;
    foundJobReferal.refer_employee_email = refer_employee_email;
    foundJobReferal.refer_employee_adhaar_no = refer_employee_adhaar_no;
    foundJobReferal.refer_employee_resume = refer_employee_resume;

    //   foundjobopening.JobDescription = JobDescription;

    const jobreferral = await foundJobReferal.save();

    res.send({ message: `jobreferral ${jobid} updated`, jobreferral });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

jobRouter.put('/admin-jobreferral/:id', async (req, res) => {
  const jobid = req.params.id;
  const {
    profile_screened,
    profile_screenedBy,
    interview_scheduled,
    interview_completed,
    refer_employee_joined,
  } = req.body;

  try {
    const foundJobReferal = await JobReferal.findOne({
      where: {
        JobID: jobid,
      },
    });

    if (!foundJobReferal) {
      return res
        .status(404)
        .json({ success: false, error: 'foundJobReferal not found' });
    }

    foundJobReferal.profile_screened = profile_screened;
    foundJobReferal.profile_screenedBy = profile_screenedBy;
    foundJobReferal.interview_scheduled = interview_scheduled;
    foundJobReferal.interview_completed = interview_completed;
    foundJobReferal.refer_employee_joined = refer_employee_joined;

    //   foundjobopening.JobDescription = JobDescription;

    const jobreferral = await foundJobReferal.save();

    res.send({ message: `jobreferral ${jobid} updated`, jobreferral });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// ---------------job referral-----------------------

export default jobRouter;
