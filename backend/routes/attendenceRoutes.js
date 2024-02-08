import express from 'express';
import cron from 'node-cron';
import Employee from '../models/employeeModel.js';
import expressAsyncHandler from 'express-async-handler';
import moment from 'moment-timezone';
import { format } from 'date-fns';
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
import AttendanceRecord from '../models/RfidCkeck.js';
import RfidCkeck from '../models/RfidCkeck.js';
import { Op } from 'sequelize';

const attendenceRouter = express.Router();

dotenv.config();

const logo =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';

attendenceRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await RfidCkeck.findOne(id);
    if (!attendance) return res.status(404).send('attendance not found');
    else {
      res.status(200).send({ attendance });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

attendenceRouter.get('/getDaysInMonth/:month/:year', (req, res) => {
  const { month, year } = req.params;

  // Your logic to calculate days in a month (replace this with your own logic)
  const daysInMonth = new Date(year, month, 0).getDate();

  res.json({ daysInMonth });
});

attendenceRouter.get('/:id/:day/:month/:year', async (req, res) => {
  try {
    const { id, day, month, year } = req.params;

    const attendance = await RfidCkeck.findOne({
      where: {
        employee_id: id,
        day: day,
        month: month,
        year: year,
      },
    });

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance not found' });
    } else {
      return res.status(200).json({ attendance });
    }
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

attendenceRouter.get('/', async (req, res) => {
  // const employee = await Employee.findByPk(id);
  const attendance = await RfidCkeck.findAll();

  // Send the created employees as the response
  res.send({ attendance });
});

// Route for the first entry
attendenceRouter.post('/submit-entry-1', async (req, res) => {
  try {
    const {
      UID,
      IN_LATTITUDE_1,
      IN_LONGITUDE_1,
      IN_TIME_1,
      month,
      year,
      day,
      Name,
      employee_id,
      isLeave,
      totalHours,
      LeaveType,
    } = req.body;

    // Assuming you have some validation here

    // Check if employee with the given UID and employee_id exists
    const existingEmployee = await Employee.findOne({
      where: {
        UID: UID,
        employee_id: employee_id,
      },
    });

    if (!existingEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    } else {
      // If entry for the day does not exist, create a new entry with the first entry details

      await RfidCkeck.create({
        UID,
        IN_LATTITUDE_1,
        IN_LONGITUDE_1,
        IN_TIME_1,
        month,
        year,
        day,
        Name,
        employee_id,
        isLeave,
        totalHours,
        LeaveType,
        // Add other necessary fields here
      });

      res.status(201).json({ message: 'First entry submitted successfully' });

      // Create a transporter object using Yandex SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the  service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${existingEmployee.email}>`,
          subject: 'Punch In Successfull✅',
          html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>punch Email</title>
            </head>
            <body>
              <div
                class="container"
                style="
                  background-color: #ffffff;
                  height: 270px;
                  font-family: system-ui;
                  width: 600px;
                  margin: 2px auto;
                  margin-top: 10px;
                  border-radius: 5px;
                  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
                "
              >
                <div id="logo" style="display: flex; justify-content: end">
                  <img
                    src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png"
                    alt="logo"
                    style="
                      width: 100px;
                      height: 120px;
                      margin-right: 30px;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="margin-left: 49px">
                  <section style="font-size: 18px">
                    Dear <b>${existingEmployee.NAME},</b><br /><br />
          
                    Your Punch In Successfully at
                    <span
                      style="
                        background: rgb(66, 233, 48);
                        padding: 4px 14px;
                        color: #ffffff;
                        border-radius: 3px;
                      "
                      >${IN_TIME_1}</span
                    >
                    <br />
                  </section>
          
                  <p style="font-size: 18px; margin-top: 18px; padding: 10px">
                    Thank You.
                  </p>
                </div>
              </div>
            </body>
          </html>
          
          
          `,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
          }
        }
      );
    }
  } catch (error) {
    console.error('Error submitting first entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//ROUTE FOR FISRT EXIT
attendenceRouter.put(
  '/submit-exit-1/:employee_id/:day/:month/:year',
  async (req, res) => {
    try {
      const { OUT_LATTITUDE_1, OUT_LONGITUDE_1, OUT_TIME_1 } = req.body;

      const { employee_id, month, year, day } = req.params;

      // Check if entry for the given day exists
      const existingEntry = await RfidCkeck.findOne({
        where: {
          employee_id,
          year,
          month,
          day,
          IN_TIME_1: { [Op.not]: null },
        },
      });

      if (!existingEntry) {
        return res.status(404).json({ message: 'First Entry not found.' });
      }

      existingEntry.OUT_LATTITUDE_1 = OUT_LATTITUDE_1;
      existingEntry.OUT_LONGITUDE_1 = OUT_LONGITUDE_1;
      existingEntry.OUT_TIME_1 = OUT_TIME_1;

      // Calculate time differences
      const timeDiff1 =
        new Date(existingEntry.OUT_TIME_1) - new Date(existingEntry.IN_TIME_1);

      // Calculate total hours in milliseconds
      const totalMilliseconds = timeDiff1;

      const totalHours = totalMilliseconds / (1000 * 60 * 60);

      existingEntry.totalHours = parseFloat(totalHours.toFixed(2));

      // Save the updated employee document
      await existingEntry.save();

      res
        .status(200)
        .json({ message: 'First Exit details updated successfully' });

      // Check if employee with the given UID and employee_id exists
      const existingEmployee = await Employee.findOne({
        where: {
          employee_id: employee_id,
        },
      });

      if (!existingEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Create a transporter object using Yandex SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the  service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${existingEmployee.email}>`,
          subject: 'Punch out Successfull✅',
          html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>punch Email</title>
        </head>
        <body>
          <div
            class="container"
            style="
              background-color: #ffffff;
              height: 270px;
              font-family: system-ui;
              width: 600px;
              margin: 2px auto;
              margin-top: 10px;
              border-radius: 5px;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
            "
          >
            <div id="logo" style="display: flex; justify-content: end">
              <img
                src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png"
                alt="logo"
                style="
                  width: 100px;
                  height: 120px;
                  margin-right: 30px;
                  object-fit: contain;
                "
              />
            </div>
            <div style="margin-left: 49px">
              <section style="font-size: 18px">
                Dear <b>${existingEmployee.NAME},</b><br /><br />
      
                Your Punch Out Successfully at
                <span
                  style="
                    background: rgb(66, 233, 48);
                    padding: 4px 14px;
                    color: #ffffff;
                    border-radius: 3px;
                  "
                  >${OUT_TIME_1}</span
                >
                <br />
              </section>
      
              <p style="font-size: 18px; margin-top: 18px; padding: 10px">
                Thank You.
              </p>
            </div>
          </div>
        </body>
      </html>
      
      
      `,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
          }
        }
      );
    } catch (error) {
      console.error('Error submitting second entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

//ROUTE FOR 2ND ENTRY
attendenceRouter.put(
  '/submit-entry-2/:employee_id/:day/:month/:year',
  async (req, res) => {
    try {
      const { IN_LATTITUDE_2, IN_LONGITUDE_2, IN_TIME_2 } = req.body;

      const { employee_id, month, year, day } = req.params;

      // Check if entry for the given day exists
      const existingEntry = await RfidCkeck.findOne({
        where: {
          employee_id,
          year,
          month,
          day,
          IN_TIME_1: { [Op.not]: null },
          OUT_TIME_1: { [Op.not]: null },
        },
      });

      if (!existingEntry) {
        return res
          .status(404)
          .json({ message: 'First Entry and First Exit not found.' });
      }

      existingEntry.IN_LATTITUDE_2 = IN_LATTITUDE_2;
      existingEntry.IN_LONGITUDE_2 = IN_LONGITUDE_2;
      existingEntry.IN_TIME_2 = IN_TIME_2;

      // Save the updated employee document
      await existingEntry.save();

      res
        .status(200)
        .json({ message: 'Second Entry details updated successfully' });

      // Check if employee with the given UID and employee_id exists
      const existingEmployee = await Employee.findOne({
        where: {
          employee_id: employee_id,
        },
      });

      if (!existingEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Create a transporter object using Yandex SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the  service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${existingEmployee.email}>`,
          subject: 'Punch In Successfull✅',
          html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>punch Email</title>
        </head>
        <body>
          <div
            class="container"
            style="
              background-color: #ffffff;
              height: 270px;
              font-family: system-ui;
              width: 600px;
              margin: 2px auto;
              margin-top: 10px;
              border-radius: 5px;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
            "
          >
            <div id="logo" style="display: flex; justify-content: end">
              <img
                src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png"
                alt="logo"
                style="
                  width: 100px;
                  height: 120px;
                  margin-right: 30px;
                  object-fit: contain;
                "
              />
            </div>
            <div style="margin-left: 49px">
              <section style="font-size: 18px">
                Dear <b>${existingEmployee.NAME},</b><br /><br />
      
                Your second Punch In Successfully at
                <span
                  style="
                    background: rgb(66, 233, 48);
                    padding: 4px 14px;
                    color: #ffffff;
                    border-radius: 3px;
                  "
                  >${IN_TIME_2}</span
                >
                <br />
              </section>
      
              <p style="font-size: 18px; margin-top: 18px; padding: 10px">
                Thank You.
              </p>
            </div>
          </div>
        </body>
      </html>`,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
          }
        }
      );
    } catch (error) {
      console.error('Error submitting second entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

//ROUTE FOR 2ND EXIT
attendenceRouter.put(
  '/submit-exit-2/:employee_id/:day/:month/:year',
  async (req, res) => {
    try {
      const { OUT_LATTITUDE_2, OUT_LONGITUDE_2, OUT_TIME_2 } = req.body;

      const { employee_id, month, year, day } = req.params;

      // Check if entry for the given day exists
      const existingEntry = await RfidCkeck.findOne({
        where: {
          employee_id,
          year,
          month,
          day,
          IN_TIME_1: { [Op.not]: null },
          OUT_TIME_1: { [Op.not]: null },
          IN_TIME_2: { [Op.not]: null },
        },
      });

      if (!existingEntry) {
        return res.status(404).json({
          message: 'First Entry or First Exit or Second Entry not found.',
        });
      }

      existingEntry.OUT_LATTITUDE_2 = OUT_LATTITUDE_2;
      existingEntry.OUT_LONGITUDE_2 = OUT_LONGITUDE_2;
      existingEntry.OUT_TIME_2 = OUT_TIME_2;

      // Calculate time differences
      const timeDiff1 =
        new Date(existingEntry.OUT_TIME_1) - new Date(existingEntry.IN_TIME_1);
      const timeDiff2 =
        new Date(existingEntry.OUT_TIME_2) - new Date(existingEntry.IN_TIME_2);

      // Calculate total hours in milliseconds
      const totalMilliseconds = timeDiff1 + timeDiff2;

      const totalHours = totalMilliseconds / (1000 * 60 * 60);

      existingEntry.totalHours = parseFloat(totalHours.toFixed(2));

      // Save the updated employee document
      await existingEntry.save();

      res.status(200).json({
        message: `Second Exit details updated successfully  and total hours are ${existingEntry.totalHours}`,
      });

      // Check if employee with the given UID and employee_id exists
      const existingEmployee = await Employee.findOne({
        where: {
          employee_id: employee_id,
        },
      });

      if (!existingEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Create a transporter object using Yandex SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the  service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${existingEmployee.email}>`,
          subject: 'Punch out Successfull✅',
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>punch Email</title>
  </head>
  <body>
    <div
      class="container"
      style="
        background-color: #ffffff;
        height: 270px;
        font-family: system-ui;
        width: 600px;
        margin: 2px auto;
        margin-top: 10px;
        border-radius: 5px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
      "
    >
      <div id="logo" style="display: flex; justify-content: end">
        <img
          src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png"
          alt="logo"
          style="
            width: 100px;
            height: 120px;
            margin-right: 30px;
            object-fit: contain;
          "
        />
      </div>
      <div style="margin-left: 49px">
        <section style="font-size: 18px">
          Dear <b>${existingEmployee.NAME},</b><br /><br />

          Your second Punch out Successfully at
          <span
            style="
              background: rgb(66, 233, 48);
              padding: 4px 14px;
              color: #ffffff;
              border-radius: 3px;
            "
            >${OUT_TIME_2}</span
          >
          <br />
        </section>

        <p style="font-size: 18px; margin-top: 18px; padding: 10px">
          Thank You.
        </p>
      </div>
    </div>
  </body>
</html>`,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
          }
        }
      );
    } catch (error) {
      console.error('Error submitting second entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

//ROUTE FOR 3RD ENTRY
attendenceRouter.put(
  '/submit-entry-3/:employee_id/:day/:month/:year',
  async (req, res) => {
    try {
      const { IN_LATTITUDE_3, IN_LONGITUDE_3, IN_TIME_3 } = req.body;

      const { employee_id, month, year, day } = req.params;

      // Check if entry for the given day exists
      const existingEntry = await RfidCkeck.findOne({
        where: {
          employee_id,
          year,
          month,
          day,
          IN_TIME_1: { [Op.not]: null },
          OUT_TIME_1: { [Op.not]: null },
          IN_TIME_2: { [Op.not]: null },
          OUT_TIME_2: { [Op.not]: null },
        },
      });

      if (!existingEntry) {
        return res.status(404).json({
          message:
            'First Entry or First Exit or Second Entry or Second Exit not found.',
        });
      }

      existingEntry.IN_LATTITUDE_3 = IN_LATTITUDE_3;
      existingEntry.IN_LONGITUDE_3 = IN_LONGITUDE_3;
      existingEntry.IN_TIME_3 = IN_TIME_3;

      // Save the updated employee document
      const entry = await existingEntry.save();

      res
        .status(200)
        .json({ message: 'Third Entry details updated successfully', entry });

      // Check if employee with the given UID and employee_id exists
      const existingEmployee = await Employee.findOne({
        where: {
          employee_id: employee_id,
        },
      });

      if (!existingEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Create a transporter object using Yandex SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the  service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${existingEmployee.email}>`,
          subject: 'Punch in Successfull✅',
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>punch Email</title>
  </head>
  <body>
    <div
      class="container"
      style="
        background-color: #ffffff;
        height: 270px;
        font-family: system-ui;
        width: 600px;
        margin: 2px auto;
        margin-top: 10px;
        border-radius: 5px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
      "
    >
      <div id="logo" style="display: flex; justify-content: end">
        <img
          src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png"
          alt="logo"
          style="
            width: 100px;
            height: 120px;
            margin-right: 30px;
            object-fit: contain;
          "
        />
      </div>
      <div style="margin-left: 49px">
        <section style="font-size: 18px">
          Dear <b>${existingEmployee.NAME},</b><br /><br />

          Your Third Punch in Successfully at
          <span
            style="
              background: rgb(66, 233, 48);
              padding: 4px 14px;
              color: #ffffff;
              border-radius: 3px;
            "
            >${IN_TIME_3}</span
          >
          <br />
        </section>

        <p style="font-size: 18px; margin-top: 18px; padding: 10px">
          Thank You.
        </p>
      </div>
    </div>
  </body>
</html>`,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
          }
        }
      );
    } catch (error) {
      console.error('Error submitting second entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

//ROUTE FOR 3RD EXIT
attendenceRouter.put(
  '/submit-exit-3/:employee_id/:day/:month/:year',
  async (req, res) => {
    try {
      const { OUT_LATTITUDE_3, OUT_LONGITUDE_3, OUT_TIME_3 } = req.body;
      const { employee_id, month, year, day } = req.params;

      // Check if entry for the given day exists
      const existingEntry = await RfidCkeck.findOne({
        where: {
          employee_id,
          year,
          month,
          day,
          IN_TIME_1: { [Op.not]: null },
          OUT_TIME_1: { [Op.not]: null },
          IN_TIME_2: { [Op.not]: null },
          OUT_TIME_2: { [Op.not]: null },
          IN_TIME_3: { [Op.not]: null },
        },
      });

      if (!existingEntry) {
        return res.status(404).json({
          message:
            'First Entry or First Exit or Second Entry or Second Exit or Third Entry not found.',
        });
      }

      existingEntry.OUT_LATTITUDE_3 = OUT_LATTITUDE_3;
      existingEntry.OUT_LONGITUDE_3 = OUT_LONGITUDE_3;
      existingEntry.OUT_TIME_3 = OUT_TIME_3;

      // Calculate time differences
      const timeDiff1 =
        new Date(existingEntry.OUT_TIME_1) - new Date(existingEntry.IN_TIME_1);
      const timeDiff2 =
        new Date(existingEntry.OUT_TIME_2) - new Date(existingEntry.IN_TIME_2);
      const timeDiff3 =
        new Date(existingEntry.OUT_TIME_3) - new Date(existingEntry.IN_TIME_3);

      // Calculate total hours in milliseconds
      const totalMilliseconds = timeDiff1 + timeDiff2 + timeDiff3;

      const totalHours = totalMilliseconds / (1000 * 60 * 60);

      existingEntry.totalHours = parseFloat(totalHours.toFixed(2));

      const entry = await existingEntry.save();

      res
        .status(200)
        .json({ message: 'Third Exit details updated successfully', entry });

      // Check if employee with the given UID and employee_id exists
      const existingEmployee = await Employee.findOne({
        where: {
          employee_id: employee_id,
        },
      });

      if (!existingEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Create a transporter object using Yandex SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the  service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${existingEmployee.email}>`,
          subject: 'Punch out Successfull✅',
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>punch Email</title>
  </head>
  <body>
    <div
      class="container"
      style="
        background-color: #ffffff;
        height: 270px;
        font-family: system-ui;
        width: 600px;
        margin: 2px auto;
        margin-top: 10px;
        border-radius: 5px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
      "
    >
      <div id="logo" style="display: flex; justify-content: end">
        <img
          src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png"
          alt="logo"
          style="
            width: 100px;
            height: 120px;
            margin-right: 30px;
            object-fit: contain;
          "
        />
      </div>
      <div style="margin-left: 49px">
        <section style="font-size: 18px">
          Dear <b>${existingEmployee.NAME},</b><br /><br />

          Your Third Punch out Successfully at
          <span
            style="
              background: rgb(66, 233, 48);
              padding: 4px 14px;
              color: #ffffff;
              border-radius: 3px;
            "
            >${OUT_TIME_3}</span
          >
          <br />
        </section>

        <p style="font-size: 18px; margin-top: 18px; padding: 10px">
          Thank You.
        </p>
      </div>
    </div>
  </body>
</html>`,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
          }
        }
      );
    } catch (error) {
      console.error('Error submitting third exit:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default attendenceRouter;
