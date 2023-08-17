import express from 'express';
import Employee from '../models/employeeModel.js';
import expressAsyncHandler from 'express-async-handler';
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
const emplyeeRouter = express.Router();

dotenv.config();
emplyeeRouter.get('/', async (req, res) => {
  // Insert new employee data using insertMany()
  const employees = await Employee.find();

  // Send the created employees as the response
  res.send({ employees });
});

emplyeeRouter.get('/details/:id', async (req, res) => {
  const id = req.params.id;
  const employee = await Employee.findById(id);

  // Send the created employees as the response
  res.send({ employee });
});

// --add employee-------------------
emplyeeRouter.post('/', async (req, res) => {
  const {
    employee_id,
    name,
    image,
    email,
    password,
    isAdmin,
    isSuperAdmin,
    isSales,
    isScm,
    isDesign,
    isProject,
    isVisitor,
    isProduction,
    isAccountant,
    joiningDate,
    birth_date,
    gender,
    designation,
    state,
    address,
    mobile_no,
    age,
    experience,
    activate,
    leaves,
    sick,
    privilege,
    casual,
    pf_account_no,
    bank_account_no,
    uan_number,
    pan_number,
    aadhar_no,
    payslips,
  } = req.body;

  // Create a new Employee instance with the provided data
  const newEmployee = new Employee({
    employee_id,
    name,
    image,
    email,
    password,
    isAdmin,
    isSuperAdmin,
    isSales,
    isScm,
    isDesign,
    isProject,
    isVisitor,
    isProduction,
    isAccountant,
    joiningDate,
    birth_date,
    gender,
    designation,
    state,
    address,
    mobile_no,
    age,
    experience,
    activate,
    leaves,
    sick,
    privilege,
    casual,
    pf_account_no,
    bank_account_no,
    uan_number,
    pan_number,
    aadhar_no,
    payslips,
  });

  try {
    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // Send the newly created employee as the response
    res.status(201).json({ success: true, employee: savedEmployee });
  } catch (error) {
    // Handle any errors that may occur during employee creation
    res.status(500).json({ success: false, error: 'Failed to add employee' });
  }
});
// --add employee-------------------

// -----------------activate employee------------
emplyeeRouter.put('/activate/:id', async (req, res) => {
  const { id } = req.params;
  const { activate } = req.body;

  try {
    // Find the employee in the database by the provided employee_id
    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: 'Employee not found' });
    }

    // Update the 'activate' property based on the provided value
    employee.activate = activate;

    // Save the updated employee to the database
    const updatedEmployee = await employee.save();

    const message = `Employee ${employee.name} has been ${
      activate ? 'Activated' : 'Deactivated'
    }`;

    // Send the updated employee and custom message as the response
    res.json({ success: true, employee: updatedEmployee, message });
  } catch (error) {
    // Handle any errors that may occur during the update
    res
      .status(500)
      .json({ success: false, error: 'Failed to update employee' });
  }
});

// -----------------activate employee------------

emplyeeRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ email: req.body.email });
    if (employee && bcrypt.compareSync(req.body.password, employee.password)) {
      // Code to be executed if the employee ID matches

      res.send({
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        isAdmin: employee.isAdmin,
        isSuperAdmin: employee.isSuperAdmin,
        isSales: employee.isSales,
        isScm: employee.isScm,
        isDesign: employee.isDesign,
        isProject: employee.isProject,
        isVisitor: employee.isVisitor,
        isProduction: employee.isProduction,
        isAccountant: employee.isAccountant,
        activate: employee.activate,
        leaves: employee.leaves,
        sick: employee.sick,
        privilege: employee.privilege,
        casual: employee.casual,
        profileImage: employee.image, // Include the profile image URL
        token: generateToken(employee),
        message: 'Sign in successful!', // Success message
      });
      return;
    }

    res.status(401).send({ message: 'Invalid Credentials' });
  })
);

// emplyeeRouter.post(
//   '/forget-password',
//   expressAsyncHandler(async (req, res) => {
//     const employee = await Employee.findOne({ email: req.body.email });

//     if (employee) {
//       const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET, {
//         expiresIn: '3h',
//       });
//       employee.resetToken = token;
//       await employee.save();

//       //reset link
//       console.log(`${baseUrl()}/reset-password/${token}`);

//       mailgun()
//         .messages()
//         .send(
//           {
//             from: 'TAYPRO <employee-lwbn@mg.yourdomain.com>',
//             to: `${employee.name} <${employee.email}>`,
//             subject: `Reset Password`,
//             html: `
//              <p>Please Click the following link to reset your password:</p>
//              <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>
//              `,
//           },
//           (error, body) => {
//             console.log(error);
//             console.log(body);
//           }
//         );
//       res.send({ message: 'We sent reset password link to your email.' });
//     } else {
//       res.status(404).send({ message: 'User not found' });
//     }
//   })
// );

emplyeeRouter.post(
  '/forget-password',
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ email: req.body.email });

    if (employee) {
      const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
      });
      employee.resetToken = token;
      await employee.save();

      // Create a transporter object using Yandex SMTP
      const transporter = nodemailer.createTransport({
        service: 'Yandex', // Use the Yandex service
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      // Send the email
      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${employee.email}>`,
          subject: 'Reset Password',
          html: `
          <p>Please Click the following link to reset your password:</p>
          <a href="${baseUrl()}/reset-password/${token}">Reset Password</a>
        `,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: 'Error sending email' });
          } else {
            console.log('Email sent:', info.response);
            res.send({ message: 'We sent reset password link to your email.' });
          }
        }
      );
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

emplyeeRouter.post(
  '/reset-password',
  expressAsyncHandler(async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        const employee = await Employee.findOne({ resetToken: req.body.token });
        if (employee) {
          if (req.body.password) {
            employee.password = bcrypt.hashSync(req.body.password, 8);
            // user.password = bcrypt.hashSync(req.body.password, 8);
            await employee.save();
            res.send({
              message: 'Password reseted successfully',
            });
          }
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      }
    });
  })
);

// ----------payslip------------------
// Route for adding a payslip entry
emplyeeRouter.post('/:id/payslips', async (req, res) => {
  const { id } = req.params;
  const { month, year, salary, deductions, deductionReason, bonuses, status } =
    req.body;

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Create a new payslip entry
    const payslipEntry = {
      month,
      year,
      salary,
      deductions,
      deductionReason,
      bonuses,
      status,
    };

    // Add the payslip entry to the employee's payslips array
    employee.payslips.push(payslipEntry);

    // Save the updated employee document
    await employee.save();

    return res
      .status(201)
      .json({ message: `Payslip  of month ${month} created successfully.` });
  } catch (error) {
    console.error('Error adding payslip entry:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// ----------payslip------------------

// 1
// ----------edit employee adreess------------------

// Route for edit emplopyee address
emplyeeRouter.put('/address/:id', async (req, res) => {
  const { id } = req.params;
  const { address, state } = req.body;

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    (employee.address = address),
      (employee.state = state),
      // Save the updated employee document
      await employee.save();

    return res
      .status(201)
      .json({ message: `Address updated successfully.`, employee });
  } catch (error) {
    console.error('Error while updating address:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});
// ----------edit employee adreess------------------

// 2
// ----------edit personal Details------------------

// Route for edit emplopyee personal details
emplyeeRouter.put('/personaldetails/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    joiningDate,
    birth_date,
    gender,
    designation,
    mobile_no,
    age,
    experience,
  } = req.body;

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    (employee.name = name),
      (employee.email = email),
      (employee.joiningDate = joiningDate),
      (employee.birth_date = birth_date),
      (employee.gender = gender),
      (employee.designation = designation),
      (employee.age = age),
      (employee.experience = experience),
      (employee.mobile_no = mobile_no),
      // Save the updated employee document
      await employee.save();

    return res
      .status(201)
      .json({ message: `Personal Details updated successfully.` });
  } catch (error) {
    console.error('Error while updating Personal Details:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});
// ----------edit employee personalDetails------------------

// 3
// ----------edit identity Details------------------

// Route for edit emplopyee identity details
emplyeeRouter.put('/identitydetails/:id', async (req, res) => {
  const { id } = req.params;
  const { pf_account_no, bank_account_no, uan_number, pan_number, aadhar_no } =
    req.body;

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    (employee.pf_account_no = pf_account_no),
      (employee.bank_account_no = bank_account_no),
      (employee.uan_number = uan_number),
      (employee.pan_number = pan_number),
      (employee.aadhar_no = aadhar_no),
      // Save the updated employee document
      await employee.save();

    return res
      .status(201)
      .json({ message: `Identity details updated successfully.` });
  } catch (error) {
    console.error('Error while updating Identity Details:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});
// ----------edit employee identity------------------

const logo =
  'https://taypro.in/assets/images/taypro-registered-without-tagline-354x82.png';
// ------------------apply for leave-------------------------------
emplyeeRouter.post(
  '/apply-leave/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const employeeId = req.params.id;
    const leaveType = req.body.type;
    const leaveStart = new Date(req.body.expectedDateOfLeave);
    const leaveEnd = new Date(req.body.expectedDateOfreturn);

    try {
      // Find the employee by ID
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        return res.status(404).send({ message: 'Employee Not Found' });
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
        // Update the leave count field
        employee[leaveType] -= numberOfDays;
        employee.leaves -= numberOfDays;
        // Create the leave application
        const leaveApplication = {
          employee_id: employee.employee_id,
          name: employee.name,
          type: leaveType,
          other: req.body.other || '',
          expectedDateOfLeave: leaveStart,
          expectedDateOfreturn: leaveEnd,
          reasonInDetail: req.body.reasonInDetail || '',
          mobileNo: employee.mobile_no || '',
          approved: false,
          approvedBy: '',
          remark: '',
          approvedAt: '',
          remarkBy: '',
        };
        // Create a transporter object using Yandex SMTP
        const transporter = nodemailer.createTransport({
          service: 'Yandex', // Use the Yandex service
          auth: {
            user: process.env.MAIL_USER, // Your Yandex email address
            pass: process.env.MAIL_PASS, // Your Yandex email password
          },
        });
        const updatedEmployee = await employee.save();

        // Fetch the _id of the last added leave application
        const leaveApplicationId =
          updatedEmployee.allLeaves[updatedEmployee.allLeaves.length - 1]._id;

        transporter.sendMail(
          {
            from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
            to: `<${req.employee.email}>`,
            subject: `${employee.name} - Leave Request`,
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
          <p>Dear Sir,</p>
          <p>
            This is to inform you that <b>${leaveApplication.name}-[${
              leaveApplication.employee_id
            }]</b>,
            working as <b>${
              employee.designation
            }</b>, has requested a leave from
            <b>
            ${new Date(leaveApplication.expectedDateOfLeave).toLocaleDateString(
              'en-GB',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }
            )}
           </b> to <b>${new Date(
             leaveApplication.expectedDateOfreturn
           ).toLocaleDateString('en-GB', {
             day: '2-digit',
             month: '2-digit',
             year: 'numeric',
           })}</b> .
          </p>
          <p>
            <b>Reason for Leave:</b>
            <span>${leaveApplication.reasonInDetail}</span>
          </p>
          <p>
            Kindly review the request and take necessary actions. You can contact
            the employee directly for any clarifications.
          </p>
          <a href='${baseUrl()}/leave-application/${leaveApplicationId}' target="blank"> Take Action </a>
        </div>
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
              console.log('Email sent:', info.response);
            }
          }
        );

        res.status(201).send({
          message: 'Leave Application submitted',
          updatedEmployee, // Return the updated employee document
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
emplyeeRouter.get('/leaves/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    // Find the employee by ID and retrieve their leaves
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).send({ message: 'Employee Not Found' });
    }

    const leaves = employee.allLeaves; // Retrieve the leaves array from the employee document

    res.status(200).send({ leaves });
  } catch (error) {
    console.error('Error while retrieving leaves:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
// ------------------------------get all leaves of one employee-----------------------

//--------------------------------get one leave of one emplyee-------------------------
emplyeeRouter.get('/leave/:employeeid/:id', async (req, res) => {
  const employeeId = req.params.employeeid;
  const leaveId = req.params.id;

  try {
    // Find the employee by ID and retrieve their leaves
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).send({ message: 'Employee Not Found' });
    }

    const leaves = employee.allLeaves; // Retrieve the leaves array from the employee document

    // Find the specific leave by its ID
    const specificLeave = leaves.find(
      (leave) => leave._id.toString() === leaveId
    );

    if (!specificLeave) {
      return res.status(404).send({ message: 'Leave Not Found' });
    }

    res.status(200).send({ message: 'Leave  Found', leave: specificLeave });
  } catch (error) {
    console.error('Error while retrieving leaves:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
//--------------------------------get one leave of one emplyee-------------------------

//--------------------------------update one leave of one emplyee-------------------------
emplyeeRouter.put(
  '/leave/:employeeid/:id',
  isAuth,
  isAdmin,
  isSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const { employeeid, id } = req.params;

    try {
      // Find the employee by ID
      const employee = await Employee.findById(employeeid);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      // Find the leave entry within the employee's allLeaves array by leave ID
      const leaveFound = employee.allLeaves.find(
        (leave) => leave._id.toString() === id
      );

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

      // Save the updated employee document
      await employee.save();

      return res
        .status(201)
        .json({ message: 'Leave updated successfully.', leaveFound });
    } catch (error) {
      console.error('Error while approving leave:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  })
);
//--------------------------------update one leave of one emplyee-------------------------

// Update the route path to include the employee ID and leave ID
emplyeeRouter.put(
  '/leaves/:id/:leaveId/approve',
  isAuth,
  isAdmin,
  isSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const { id, leaveId } = req.params;

    try {
      // Find the employee by ID
      const employee = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      // Find the leave entry within the employee's allLeaves array by leave ID
      const leaveEntry = employee.allLeaves.find(
        (leave) => leave._id.toString() === leaveId
      );

      if (!leaveEntry) {
        return res
          .status(404)
          .json({ message: 'Leave not found for the employee.' });
      }

      // Update the leave entry with approval details
      leaveEntry.approved = req.body.approved;
      leaveEntry.approvedBy = req.employee.name;
      leaveEntry.remark = req.body.remark;
      leaveEntry.approvedAt = new Date();
      leaveEntry.remarkBy = req.employee.name;

      // Save the updated employee document
      await employee.save();

      return res
        .status(201)
        .json({ message: 'Leave Approved successfully.', employee });
    } catch (error) {
      console.error('Error while approving leave:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  })
);

// ------------------------------approve leave-----------------------

// ------------------------------Reject leave-----------------------
// emplyeeRouter
emplyeeRouter.put(
  '/leaves/:id/:leaveId/reject',
  isAuth,
  isAdmin,
  isSuperAdmin,
  expressAsyncHandler(async (req, res) => {
    const { id, leaveId } = req.params;

    try {
      // Find the employee by ID
      const employee = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      // Find the leave entry within the employee's allLeaves array by leave ID
      const leaveEntry = employee.allLeaves.find(
        (leave) => leave._id.toString() === leaveId
      );

      if (!leaveEntry) {
        return res
          .status(404)
          .json({ message: 'Leave not found for the employee.' });
      }

      // Update the leave entry with rejection details
      leaveEntry.approved = false;
      leaveEntry.approvedBy = '';
      leaveEntry.remark = req.body.remark;
      leaveEntry.approvedAt = '';
      leaveEntry.remarkBy = req.employee.name;

      // Save the updated employee document
      await employee.save();

      return res
        .status(201)
        .json({ message: 'Leave Rejected successfully.', employee });
    } catch (error) {
      console.error('Error while rejecting leave:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  })
);

// ------------------------------reject leave-----------------------

export default emplyeeRouter;
