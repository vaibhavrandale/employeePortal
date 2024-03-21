import express from 'express';
import cron from 'node-cron';
import expressAsyncHandler from 'express-async-handler';
import moment from 'moment-timezone';
import { Op } from 'sequelize';
import { baseUrl, isAuth, isAdmin, isSuperAdmin } from '../utils.js';
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
import Leaves from '../models/LeaveModel.js';
import Employee from '../models/employeeModel.js';

// import emoji from '../welcome_image.jpg';

const leaveRouter = express.Router();

dotenv.config();

const logo =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709106310/bhyfvfixfscmawtlhg1s.png';

// get all leaves Start

leaveRouter.get('/', async (req, res) => {
  const AllLeaves = await Leaves.findAll();

  // Send the created employees as the response
  res.send({ AllLeaves });
});

// get all leaves End

// ------------------apply for leave-------------------------------
leaveRouter.post(
  '/apply-leave/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employeeId = req.params.id;
    const leaveType = req.body.type;
    const leaveStart = new Date(req.body.expectedDateOfLeave);
    const leaveEnd = new Date(req.body.expectedDateOfreturn);

    try {
      // Find the employee by ID
      const employee = await Employee.findOne({
        where: { employee_id: employeeId },
      });

      if (!employee) {
        return res
          .status(404)
          .send({ message: 'Employee Not Found' + employeeId });
      }

      // Calculate the number of days for the leave period
      const numberOfDays =
        Math.floor((leaveEnd - leaveStart) / (1000 * 60 * 60 * 24)) + 1;

      // Check if the leave type is supported
      if (!['sick', 'privilege', 'casual'].includes(leaveType)) {
        return res.status(400).send({ message: 'Unsupported leave type.' });
      }

      // Check if the employee has enough leave days of the specified type
      if (employee[leaveType] >= numberOfDays) {
        // Create the leave application
        const leaveApplication = {
          employee_id: employee.employee_id,
          email: employee.email,
          name: employee.NAME,
          type: leaveType,
          other: req.body.other || '',
          expectedDateOfLeave: leaveStart.toISOString(), // Convert to string
          expectedDateOfreturn: leaveEnd.toISOString(), // Convert to string
          reasonInDetail: req.body.reasonInDetail || '',
          mobileNo: employee.mobile_no || '',
          approved: '0',
          approvedBy: '',
          remark: '',
          approvedAt: '',
          remarkBy: '',
        };

        // Save the leave application to the database using the Leave model
        const createdLeave = await Leaves.create(leaveApplication);

        // // Update the employee's leave count field
        // employee[leaveType] -= numberOfDays;
        // employee.leaves -= numberOfDays;
        // const updatedEmployee = await employee.save();

        // Fetch the _id of the last added leave application
        const leaveApplicationId = createdLeave.id;

        // Create a transporter object using Yandex SMTP
        const transporter = nodemailer.createTransport({
          host: 'smtp.hostinger.com', // Use the  service
          port: 465,
          auth: {
            user: process.env.MAIL_USER, // Your Yandex email address
            pass: process.env.MAIL_PASS, // Your Yandex email password
          },
        });

        // const superAdmins = await Employee.findAll({ isSuperAdmin: '1' });

        const superAdmins = await Employee.findAll({
          where: { isSuperAdmin: '1' },
        });
        const superAdminEmails = superAdmins.map((admin) => admin.email);

        transporter.sendMail(
          {
            from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
            // to: `<${req.employee.email}>`,
            to: superAdminEmails.join(', '),
            subject: `${employee.NAME} - Leave Request`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Leave Request</title>
              </head>
              <body style="background-color: rgba(223, 220, 220, 0.47)">
                <div
                  class="container"
                  style="
                  background-color: #fdfdfd;
        min-height: 81vh;
        border-radius: 10px;
        font-family: sans-serif;
        width: 650px;
        margin: 5vh auto;
                  "
                >
                  <div id="logo" style="display: flex; justify-content: end">
                    <img
                      src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png"
                      alt="logo"
                      style="
                        width: 10vmax;
                        height: 5vmax;
                        margin-right: 5vmax;
                        margin-top: 2vmax;
                        object-fit: contain;
                      "
                    />
                  </div>
            
                  <p style="font-size: 1.2vmax; margin-top: 2vmax; margin-left: 4vmax">
                    Dear Sir,<br /><br />
                    This is inform you that
                    <b>${leaveApplication.name} &nbsp;(${
              leaveApplication.employee_id
            })&nbsp;</b>, <br />
                    working as <b>${
                      employee.designation
                    }</b>,has requested a leave <br />
                    from <b style="color: green">  ${new Date(
                      leaveApplication.expectedDateOfLeave
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}</b> to
                    <b style="color: green"> ${new Date(
                      leaveApplication.expectedDateOfreturn
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}.</b>
                    <br />
                    <br />
                    <b>Reason of Leave :</b
                    ><span
                      style="
                        color: rgb(77, 203, 77);
            
                        font-weight: bold;
            
                        border-radius: 3px;
                        padding: 0px 10px;
                      "
                      >${leaveApplication.reasonInDetail}</span
                    >
                    <br />
                    <br />
                    <b>Employee Contact Details : </b><br />
                    &#128231; &nbsp;: <b>${leaveApplication.email}</b> <br />
                    &nbsp;&#128241; &nbsp;&nbsp;: <b>${
                      leaveApplication.mobileNo
                    }</b> <br />
                    <br />
                    Kindly review the request and take necessary actions.&nbsp; <br />You
                    can contact the employee directly for any clarifications. <br />
                  </p>
            
                  <a
                  href='${baseUrl()}/leave-application/${employee.employee_id}'
                    style="
                      background-color: rgb(77, 203, 77);
                      text-decoration: none;
                      padding: 5px 10px;
                      width: 8vmax;
                      height: 2.5vmax;
                      margin-left: 4vmax;
                      font-size: 1.2vmax;
                      color: #fff;
                      border: none;
                      border-radius: 5px;
                      transition: background-color 0.3s; /* Add a smooth transition effect */
                    "
                    onmouseover="this.style.backgroundColor='rgb(57, 173, 57)'; this.style.cursor='pointer'"
                    onmouseout="this.style.backgroundColor='rgb(77, 203, 77)'; this.style.cursor='default'"
                  >
                    Take Action
                  </a>
            
                  <div id="footer" style="margin-top: 2vmax; margin-left: 4vmax">
                    <p style="font-size: 1.2vmax">
                      Thanks & Regards,<br />
                      <b>${leaveApplication.name}.</b> <br />
                      ${employee.designation}
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
            } else {
              console.log('Email sent:', info.response);
            }
          }
        );

        res.status(201).send({
          message: 'Leave Application submitted',
          createdLeave,
        });
      } else {
        res.status(400).send({
          message: `Insufficient ${leaveType} leave balance.`,
        });
      }
    } catch (error) {
      console.error('Error while processing leave application:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  })
);

// ------------------apply for leave-------------------------------

// ------------------------------get all leaves of one employee-----------------------
leaveRouter.get('/:id', async (req, res) => {
  const employee_id = req.params.id;

  try {
    // Find the employee by ID and retrieve their leaves
    // const AllLeaves = await Leaves.findById(employee_id);

    const AllLeaves = await Leaves.findAll({
      where: { employee_id: employee_id },
    });
    if (!AllLeaves) {
      return res.status(404).send({ message: 'Leaves Not Found' });
    }

    res.status(200).send({ AllLeaves });
  } catch (error) {
    console.error('Error while retrieving leaves:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
// ------------------------------get all leaves of one employee-----------------------

//--------------------------------get one leave of one emplyee-------------------------
leaveRouter.get('/:employeeid/:id', async (req, res) => {
  const employeeId = req.params.employeeid;
  const leaveId = req.params.id;

  try {
    // Find the specific leave using both employeeId and leaveId
    const specificLeave = await Leaves.findOne({
      where: {
        employee_id: employeeId,
        id: leaveId,
      },
    });

    if (!specificLeave) {
      return res.status(404).send({ message: 'Leave Not Found' });
    }

    res.status(200).send({ message: 'Leave Found', leave: specificLeave });
  } catch (error) {
    console.error('Error while retrieving leave:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

//--------------------------------get one leave of one emplyee-------------------------

//--------------------------------update one leave of one emplyee-------------------------
leaveRouter.put(
  '/updateleave/:employeeid/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { employeeid, id } = req.params;

    try {
      // Find the employee by ID
      const employee = await Employee.findOne({
        where: {
          employee_id: employeeid,
        },
      });

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      // Find the leave entry within the employee's allLeaves array by leave ID
      const leaveFound = await Leaves.findOne({
        where: {
          id: id,
        },
      });

      if (!leaveFound) {
        return res
          .status(404)
          .json({ message: 'Leave not found for the employee.' });
      }

      // Update the leave entry with approval details
      leaveFound.name = req.body.name;
      leaveFound.type = req.body.type;
      leaveFound.expectedDateOfLeave = req.body.expectedDateOfLeave;
      leaveFound.expectedDateOfreturn = req.body.expectedDateOfreturn;
      leaveFound.reasonInDetail = req.body.reasonInDetail;
      leaveFound.mobileNo = req.body.mobileNo;

      await leaveFound.save();

      return res
        .status(201)
        .json({ message: 'Leave updated successfully.', leaveFound });
    } catch (error) {
      console.error('Error while approving leave:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  })
);

leaveRouter.put(
  '/:employeeid/:leaveId/approve',
  isAuth,
  isAdmin,
  isSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const { employeeid, leaveId } = req.params;

    try {
      // Validate that `employeeid` is provided and not empty
      if (!employeeid) {
        return res.status(400).json({ message: 'Employee ID is required.' });
      }

      // Find the employee by ID
      const allLeave = await Leaves.findOne({
        where: { employee_id: employeeid }, // Ensure employee_id is defined
        id: leaveId,
      });

      const employee = await Employee.findOne({
        where: { employee_id: employeeid }, // Ensure employee_id is defined
      });

      if (!allLeave) {
        return res.status(404).json({ message: 'Leave not found.' });
      }

      // Find the leave entry within the employee's allLeaves array by leave ID
      const leaveEntry = await Leaves.findByPk(leaveId);

      if (!leaveEntry) {
        return res
          .status(404)
          .json({ message: 'Leave not found for the employee.' });
      }

      let numberOfDays =
        Math.floor(
          (new Date(leaveEntry.expectedDateOfreturn) -
            new Date(leaveEntry.expectedDateOfLeave)) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      // Function to check if a given date is a Sunday
      const isSunday = (date) => date.getDay() === 0;

      // Check if the leave includes a Sunday
      const leaveIncludesSunday =
        isSunday(new Date(leaveEntry.expectedDateOfLeave)) ||
        isSunday(new Date(leaveEntry.expectedDateOfreturn));

      // Deduct one extra day if the leave includes a Sunday
      if (leaveIncludesSunday) {
        numberOfDays--;
      }

      // Return the deducted leaves to the employee based on leave type
      switch (leaveEntry.type) {
        case 'casual':
          employee.casual -= numberOfDays;
          break;
        case 'privilege':
          employee.privilege -= numberOfDays;
          break;
        case 'sick':
          employee.sick -= numberOfDays;
          break;
        // Add more cases if you have additional leave types
        default:
          // Handle the default case or log an error if an unknown leave type is encountered
          console.error(`Unknown leave type: ${leaveEntry.type}`);
      }

      employee.leaves -= numberOfDays;

      // Update the leave entry with approval details
      leaveEntry.approved = '1';
      leaveEntry.approvedBy = req.body.approvedBy;
      leaveEntry.remark = req.body.remark;
      leaveEntry.approvedAt = req.body.approvedAt;
      leaveEntry.remarkBy = req.body.remarkBy;

      // Save the updated employee document
      const Leave = await leaveEntry.save();
      const updatedEmployee = await employee.save();

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
          to: `<${leaveEntry.email}>`,
          subject: `${allLeave.name} - Leave Request`,
          html: `
                      <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Email Content</title>
                      <style>
                      body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background-color: #f5f5f5;
                      }
                      .container {
                        background-color: #ffffff;
                        padding-left: 70px;
                        padding-right: 70px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                      }
                      .header {
                        text-align: center;
                      }
                      .image-content {
                        text-align: center;
                      }
                      img {
                        width: 100px;
                        height: 100px;
                        object-fit: contain;
                        display: flex;
                        justify-content: start;
                      }
                      .main-content {
                        margin: 20px 0px;
                      }
                      
                      .main-content a {
                        display: flex;
                        justify-content: center;
                        padding: 10px;
                        text-decoration: none;
                        background: rgb(94, 223, 94);
                        width: 130px;
                        color: #f5f5f5;
                        border-radius: 3px;
                      
                        /* margin: auto; */
                       
                      }
                      
                      .main-content a:hover {
                        background: rgb(76, 214, 71);
                      }
                      .footer {
                        font-size: 12px;
                        text-align: center;
                      }
                      
                      </style>
                  </head>
                  <body>
                  <div class="container">
                  <div class="header">
                    <h2>
                      <img src=${logo} alt="Embedded Image" />
                    </h2>
                  </div>
                  <div class="image-content"></div>
                  <div class="main-content">
                  <p>Dear ${allLeave.name},</p>
                  <p>
                    We are pleased to inform you that your leave request has been <b>approved</b>.
                  </p>
                  <p>
                    <b>Leave Details:</b>
                    <ul>
                      <li><b>Start Date:</b> ${new Date(
                        leaveEntry.expectedDateOfLeave
                      ).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}</li>
                      <li><b>End Date:</b> ${new Date(
                        leaveEntry.expectedDateOfreturn
                      ).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}</li>
                      <li><b>Reason:</b> ${leaveEntry.reasonInDetail}</li>
                      <li><b>Approved By:</b> ${leaveEntry.approvedBy}</li>
                      <li><b>Remark:</b> ${leaveEntry.remark}</li>
                    </ul>
                  </p>
                  <p>
                    Please ensure to handover your responsibilities to a colleague or make arrangements during your absence.
                  </p>
                  <div class="footer">
                    <p>This is an auto-generated email. Please do not reply.</p>
                  </div>
                </div>
                  </body>
                  `,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', leaveEntry.email, info.response);
          }
        }
      );

      return res.status(201).json({
        message: 'Leave Approved successfully.',
        Leave,
        updatedEmployee,
      });
    } catch (error) {
      console.error('Error while approving leave:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  })
);

// ------------------------------approve leave-----------------------

// ------------------------------Reject leave-----------------------

//new

leaveRouter.put(
  '/:employeeid/:leaveId/reject',
  isAuth,
  isAdmin,
  isSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const { employeeid, leaveId } = req.params;

    try {
      // Validate that `employeeid` is provided and not empty
      if (!employeeid) {
        return res.status(400).json({ message: 'Employee ID is required.' });
      }

      // Find the employee by ID
      const allLeave = await Leaves.findOne({
        where: { employee_id: employeeid }, // Ensure employee_id is defined
        id: leaveId,
      });

      const employee = await Employee.findOne({
        where: { employee_id: employeeid }, // Ensure employee_id is defined
      });

      if (!allLeave) {
        return res.status(404).json({ message: 'Leave not found.' });
      }

      // Find the leave entry within the employee's allLeaves array by leave ID
      const leaveEntry = await Leaves.findByPk(leaveId);

      if (leaveEntry.approved === '0' && leaveEntry.remark !== '') {
        return res.status(404).json({ message: 'Leave already rejected.' });
      }

      if (!leaveEntry) {
        return res
          .status(404)
          .json({ message: 'Leave not found for the employee.' });
      }

      const numberOfDays =
        Math.floor(
          (new Date(leaveEntry.expectedDateOfreturn) -
            new Date(leaveEntry.expectedDateOfLeave)) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      // Return the deducted leaves to the employee
      // allLeave[leaveEntry.type] -= numberOfDays; // Return leaves of the specific type
      if (leaveEntry.approved == 1) {
        // Return the deducted leaves to the employee based on leave type
        switch (leaveEntry.type) {
          case 'casual':
            employee.casual += numberOfDays;
            break;
          case 'privilege':
            employee.privilege += numberOfDays;
            break;
          case 'sick':
            employee.sick += numberOfDays;
            break;
          // Add more cases if you have additional leave types
          default:
            // Handle the default case or log an error if an unknown leave type is encountered
            console.error(`Unknown leave type: ${leaveEntry.type}`);
        }

        employee.leaves += numberOfDays;
      }

      // Update the leave entry with approval details
      leaveEntry.approved = '0';
      leaveEntry.approvedBy = '';
      leaveEntry.remark = req.body.remark;
      leaveEntry.approvedAt = '';
      leaveEntry.remarkBy = req.body.remarkBy;

      // Save the updated employee document
      const Leave = await leaveEntry.save();
      const updatedEmployee = await employee.save();

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
          to: `<${leaveEntry.email}>`,
          subject: `${employee.NAME} - Leave Request`,
          html: `
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Content</title>
          <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background-color: #ffffff;
            padding-left: 70px;
            padding-right: 70px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
          }
          .image-content {
            text-align: center;
          }
          img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            display: flex;
            justify-content: start;
          }
          .main-content {
            margin: 20px 0px;
          }
          
          .main-content a {
            display: flex;
            justify-content: center;
            padding: 10px;
            text-decoration: none;
            background: rgb(94, 223, 94);
            width: 130px;
            color: #f5f5f5;
            border-radius: 3px;
          
            /* margin: auto; */
           
          }
          
          .main-content a:hover {
            background: rgb(76, 214, 71);
          }
          .footer {
            font-size: 12px;
            text-align: center;
          }
          
          </style>
      </head>
      <body>
      <div class="container">
      <div class="header">
        <h2>
          <img src=${logo} alt="Embedded Image" />
        </h2>
      </div>
      <div class="image-content"></div>
      <div class="main-content">
      <p>Dear ${employee.NAME},</p>
      <p>
        We are pleased to inform you that your leave request has been <b>Rejected</b>.
      </p>
      <p>
        <b>Leave Details:</b>
        <ul>
          <li><b>Start Date:</b> ${new Date(
            leaveEntry.expectedDateOfLeave
          ).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}</li>
          <li><b>End Date:</b> ${new Date(
            leaveEntry.expectedDateOfreturn
          ).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}</li>
          <li><b>Reason:</b> ${leaveEntry.reasonInDetail}</li>
          <li><b>Remark By:</b> ${leaveEntry.remarkBy}</li>
          <li><b>Remark:</b> ${leaveEntry.remark}</li>
        </ul>
      </p>
    
      <div class="footer">
        <p>This is an auto-generated email. Please do not reply.</p>
      </div>
    </div>
      </body>
      `,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', employee.NAME, info.response);
          }
        }
      );
      return res.status(201).json({
        Leave,
      });
    } catch (error) {
      console.error('Error while rejecting leave:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  })
);

//new

// ------------------------------reject leave-----------------------

export default leaveRouter;
