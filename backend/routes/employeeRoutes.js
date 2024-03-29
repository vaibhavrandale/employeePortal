import express from 'express';
import cron from 'node-cron';
import Employee from '../models/employeeModel.js';
import expressAsyncHandler from 'express-async-handler';
import moment from 'moment';
import { format } from 'date-fns'; // Import format from date-fns
import BirthdayWish from '../models/BirthdayWish.js';
import RfidCkeck from '../models/RfidCkeck.js';
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
import RfidReg from '../models/RfidReg.js';
import Anniversary from '../models/Anniversary.js';
import UIDCard from '../models/UIDCard.js';
import LeaveLapse from '../models/LeaveLapse.js';
// import Wish from '../models/Wish.js';
// import emoji from '../welcome_image.jpg';

const emplyeeRouter = express.Router();

dotenv.config();
emplyeeRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // Insert new employee data using insertMany()
    const employees = await Employee.findAll();

    // Send the created employees as the response
    res.send({ employees });
  })
);
// http://localhost:5000/api/employees
// emplyeeRouter.get('/details/:id', async (req, res) => {
//   const id = req.params.id;
//   const employee = await Employee.findByPk(id);

//   // Send the created employees as the response
//   res.send({ employee });
// });

emplyeeRouter.get(
  '/details/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const employeeid = req.params.id;
      const employee = await Employee.findOne({
        where: { employee_id: employeeid },
      });

      if (employee) {
        res.send({ employee });
      } else {
        res.status(404).send({ message: 'Employee not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  })
);

// --------update employee-------------------------
emplyeeRouter.put('/updateemployee/:id', async (req, res) => {
  const { id } = req.params;
  const {
    employee_id,
    email,
    NAME,
    firstName,
    lastName,
    father_husband_name,
    gender,
    birth_date,
    marital_status,
    address,
    addressProof,
    sub_locality,
    district,
    state,
    pinCode,
    mobile_no,
    nominee_name,
    nominee_relationship,
    nominee_address,
    nominee_sub_locality,
    nominee_district,
    nominee_state,
    nominee_mobile_no,
    nominee_pinCode,
    nominee_email,
    no_of_family_members,
    alternate_mobile_no,
    personal_email,
    aadhar_no,
    pan_number,
    bank_account_no,
    ifsc_code,
    aadhar_card_file,
    pan_card_file,
    bank_account_file,
    pf_account_no,
    resetToken,
    password,
    image,
    joiningDate,
    designation,
    age,
    previous_company_name,
    experience,
    experience_letter,
    isAdmin,
    isSuperAdmin,
    isSales,
    isScm,
    isDesign,
    isProject,
    isVisitor,
    isProduction,
    isAccountant,
    isHr,
    isSoftwareDevlopment,
    isHardwareDevlopment,
    isDirector,
    tenth_marksheet,
    tenth_schoolName,
    twelth_or_diploma_marksheet,
    twelth_or_diploma_collegeName,
    under_geaduate_or_post_graduate_marksheet,
    under_geaduate_or_post_graduate_collegeName,
    tenth_grade,
    twelth_or_diploma_grade,
    under_geaduate_or_post_graduate_grade,

    // ctc,
    // salarygroup,
  } = req.body;

  const defaultPassword = employee_id;
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10); // Use an appropriate saltRounds value

  // Format birth_date and joiningDate using moment.js
  const formattedBirthDate = moment(birth_date, 'DD-MM-YYYY').format(
    'DD/MM/YYYY'
  );
  const formattedJoiningDate = moment(joiningDate, 'DD-MM-YYYY').format(
    'DD/MM/YYYY'
  );

  try {
    // Find the employee by ID
    const employee = await Employee.findOne({
      where: { employee_id: id },
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    employee.employee_id = employee_id;
    employee.email = email;
    employee.NAME = NAME;
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.father_husband_name = father_husband_name;
    employee.gender = gender;
    employee.birth_date = formattedBirthDate;
    employee.joiningDate = formattedJoiningDate;
    employee.marital_status = marital_status;
    employee.address = address;
    employee.addressProof = addressProof;
    employee.sub_locality = sub_locality;
    employee.district = district;
    employee.state = state;
    employee.pinCode = pinCode;
    employee.mobile_no = mobile_no;
    employee.nominee_name = nominee_name;
    employee.nominee_relationship = nominee_relationship;
    employee.nominee_address = nominee_address;
    employee.nominee_sub_locality = nominee_sub_locality;
    employee.nominee_district = nominee_district;
    employee.nominee_state = nominee_state;
    employee.nominee_mobile_no = nominee_mobile_no;
    employee.nominee_pinCode = nominee_pinCode;
    employee.nominee_email = nominee_email;
    employee.no_of_family_members = no_of_family_members;
    employee.alternate_mobile_no = alternate_mobile_no;
    employee.personal_email = personal_email;
    employee.aadhar_no = aadhar_no;
    employee.pan_number = pan_number;
    employee.bank_account_no = bank_account_no;
    employee.ifsc_code = ifsc_code;
    employee.aadhar_card_file = aadhar_card_file;
    employee.pan_card_file = pan_card_file;
    employee.bank_account_file = bank_account_file;
    employee.pf_account_no = pf_account_no;
    employee.resetToken = resetToken;
    employee.image = image;
    employee.password = hashedPassword;
    employee.designation = designation;
    employee.age = age;
    employee.previous_company_name = previous_company_name;
    employee.experience = experience;
    employee.experience_letter = experience_letter;

    employee.isAdmin = isAdmin;
    employee.isSuperAdmin = isSuperAdmin;
    employee.isSales = isSales;
    employee.isScm = isScm;
    employee.isDesign = isDesign;
    employee.isProject = isProject;
    employee.isVisitor = isVisitor;
    employee.isProduction = isProduction;
    employee.isAccountant = isAccountant;
    employee.isHr = isHr;
    employee.isSoftwareDevlopment = isSoftwareDevlopment;
    employee.isHardwareDevlopment = isHardwareDevlopment;
    employee.isDirector = isDirector;
    employee.tenth_marksheet = tenth_marksheet;
    employee.tenth_schoolName = tenth_schoolName;
    employee.tenth_grade = tenth_grade;
    employee.twelth_or_diploma_marksheet = twelth_or_diploma_marksheet;
    employee.twelth_or_diploma_collegeName = twelth_or_diploma_collegeName;
    employee.twelth_or_diploma_grade = twelth_or_diploma_grade;
    employee.under_geaduate_or_post_graduate_marksheet =
      under_geaduate_or_post_graduate_marksheet;
    employee.under_geaduate_or_post_graduate_collegeName =
      under_geaduate_or_post_graduate_collegeName;
    employee.under_geaduate_or_post_graduate_grade =
      under_geaduate_or_post_graduate_grade;

    // Save the updated employee document
    await employee.save();

    // Update RfidRegs table

    const updatedRfidReg = await RfidReg.update(
      { Contact_No: mobile_no },
      { where: { Reg_no: id } }
    );

    return res.status(201).json({
      message: `Employee  updated successfully.`,
      employee,
      updatedRfidReg,
    });
  } catch (error) {
    console.error('Error while updating address:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error.', error: error.message });
  }
});

// --------update employee-------------------------

// ---------------delete employee------------
emplyeeRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      res.status(404).send({ message: 'Employee not found' });
      return;
    }

    // Check if the employee is in the list of protected employees
    const protectedEmployees = [
      'vaibhav.randale@taypro.in',
      'yogesh@taypro.in',
    ];

    if (protectedEmployees.includes(employee.email)) {
      res.status(403).send({ message: 'Cannot delete this employee' });
      return;
    }

    // If the employee is not protected, delete them
    const deletedEmployee = await employee.destroy();
    res.send({ message: 'Employee Deleted', deletedEmployee });
  })
);

// ---------------delete employee------------

// -----------------activate employee------------
emplyeeRouter.put('/activate/:id', async (req, res) => {
  const { id } = req.params;
  const { activate } = req.body;

  try {
    // Find the employee in the database by the provided employee_id
    // const employee = await Employee.findByPk(id);
    const employee = await Employee.findOne({
      where: { employee_id: id },
    });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: 'Employee not found' });
    }

    // Update the 'activate' property based on the provided value
    employee.activate = activate;

    // Save the updated employee to the database
    const updatedEmployee = await employee.save();

    const message = `Employee ${employee.NAME} has been ${
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

emplyeeRouter.post('/signin', async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: { email: req.body.email },
    });

    if (employee && bcrypt.compareSync(req.body.password, employee.password)) {
      res.send({
        id: employee.id,
        employee_id: employee.employee_id,
        UID: employee.UID,
        NAME: employee.NAME,
        email: employee.email,
        mobile_no: employee.mobile_no,
        designation: employee.designation,
        isAdmin: employee.isAdmin,
        isSuperAdmin: employee.isSuperAdmin,
        isSales: employee.isSales,
        isScm: employee.isScm,
        isDesign: employee.isDesign,
        isProject: employee.isProject,
        isVisitor: employee.isVisitor,
        isProduction: employee.isProduction,
        isAccountant: employee.isAccountant,
        isHr: employee.isHr,
        isSoftwareDevlopment: employee.isSoftwareDevlopment,
        isHardwareDevlopment: employee.isHardwareDevlopment,
        isDirector: employee.isDirector,
        activate: employee.activate,
        leaves: employee.leaves,
        sick: employee.sick,
        privilege: employee.privilege,
        casual: employee.casual,
        profileImage: employee.image,
        joiningDate: employee.joiningDate,
        token: generateToken(employee),
        message: 'Sign in successful!',
      });
      return;
    }

    res.status(401).send({ message: 'Invalid Credentials' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

emplyeeRouter.post(
  '/forget-password',
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findOne({
      where: { email: req.body.email },
    });

    if (employee) {
      const token = jwt.sign(
        { where: { id: employee._id } },
        process.env.JWT_SECRET,
        {
          expiresIn: '3h',
        }
      );
      employee.resetToken = token;
      await employee.save();

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
          to: `<${employee.email}>`,
          subject: 'Reset Password',
          html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Reset Password</title>
            </head>
            <body>
              <div
                class="container"
                style="
                  background-color: #ffffff;
                  height: 450px;
                  font-family: system-ui;
                  width: 600px;
                  margin: 16px auto;
                  margin-top: 10px;
                  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
                "
              >
                <div id="logo" style="display: flex; justify-content: end">
                  <img
                    src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
                    alt="logo"
                    style="
                      width: 110px;
                      height: 110px;
                      margin-right: 30px;
                      margin-top: 10px;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="margin-left: 49px">
                  <section style="font-size: 18px; margin-top: 50px">
                    Dear <b>${employee.NAME},</b><br /><br />
          
                    A request has been received to reset the password for your account.
                    <br />
                    Click here to reset password.
                  </section>
                  <br />
                  <a
                    href="${baseUrl()}/reset-password/${token}"
                    style="
                      text-decoration: none;
                      display: inline-grid;
                      padding: 10px;
                      background-color: rgb(77, 203, 77);
                      width: 120px;
                      margin: 15px 0px 0px 0px;
                      color: #fff;
                      border: none;
                      border-radius: 5px;
                      transition: background-color 0.3s;
                    "
                    onmouseover="this.style.backgroundColor='rgb(57, 173, 57)'; this.style.cursor='pointer'"
                    onmouseout="this.style.backgroundColor='rgb(77, 203, 77)'; this.style.cursor='default'"
                  >
                    Reset Password
                  </a>
          
                  <p style="font-size: 18px; margin-top: 50px">Thank You.</p>
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
        const employee = await Employee.findOne({
          where: { resetToken: req.body.token },
        });
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
    const employee = await Employee.findByPk(id);

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

const logo =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709106310/bhyfvfixfscmawtlhg1s.png';

// ------------------apply for leave-------------------------------
// emplyeeRouter.post(
//   '/apply-leave/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const employeeId = req.params.id;
//     const leaveType = req.body.type;
//     const leaveStart = new Date(req.body.expectedDateOfLeave);
//     const leaveEnd = new Date(req.body.expectedDateOfreturn);

//     try {
//       // Find the employee by ID
//       const employee = await Employee.findByPk(employeeId);

//       if (!employee) {
//         return res.status(404).send({ message: 'Employee Not Found' });
//       }

//       // Calculate the number of days for the leave period
//       const numberOfDays =
//         Math.floor((leaveEnd - leaveStart) / (1000 * 60 * 60 * 24)) + 1;

//       // Check if the leave type is supported
//       if (!['sick', 'privilege', 'casual'].includes(leaveType)) {
//         return res.status(400).send({ message: 'Unsupported leave type.' });
//       }

//       // Check if the employee has enough leave days of the specified type
//       if (employee[leaveType] >= numberOfDays) {
//         // Update the leave count field
//         // employee[leaveType] -= numberOfDays;
//         // employee.leaves -= numberOfDays;
//         // Create the leave application

//         const leaveApplication = {
//           employee_id: employee.employee_id,
//           email: employee.email,
//           NAME: employee.NAME,
//           type: leaveType,
//           other: req.body.other || '',
//           expectedDateOfLeave: leaveStart,
//           expectedDateOfreturn: leaveEnd,
//           reasonInDetail: req.body.reasonInDetail || '',
//           mobileNo: employee.mobile_no || '',
//           approved: false,
//           approvedBy: '',
//           remark: '',
//           approvedAt: '',
//           remarkBy: '',
//         };
//         // Create a transporter object using Yandex SMTP
//         const transporter = nodemailer.createTransport({
//           host: 'smtp.hostinger.com', // Use the  service
//           port: 465,
//           auth: {
//             user: process.env.MAIL_USER, // Your Yandex email address
//             pass: process.env.MAIL_PASS, // Your Yandex email password
//           },
//         });
//         employee.allLeaves.push(leaveApplication);
//         const updatedEmployee = await employee.save();

// const leaveApplication = {
//   employee_id: employee.employee_id,
//   email: employee.email,
//   name: employee.name,
//   type: leaveType,
//   other: req.body.other || '',
//   expectedDateOfLeave: leaveStart,
//   expectedDateOfreturn: leaveEnd,
//   reasonInDetail: req.body.reasonInDetail || '',
//   mobileNo: employee.mobile_no || '',
//   approved: false,
//   approvedBy: '',
//   remark: '',
//   approvedAt: '',
//   remarkBy: '',
// };
// // Create a transporter object using Yandex SMTP
// const transporter = nodemailer.createTransport({
//   host: 'smtp.hostinger.com', // Use the  service
//   port: 465,
//   auth: {
//     user: process.env.MAIL_USER, // Your Yandex email address
//     pass: process.env.MAIL_PASS, // Your Yandex email password
//   },
// });
// employee.allLeaves.push(leaveApplication);
// const updatedEmployee = await employee.save();

//         // Fetch the _id of the last added leave application
//         let leaveApplicationId;
//         if (updatedEmployee.allLeaves && updatedEmployee.allLeaves.length > 0) {
//           leaveApplicationId =
//             updatedEmployee.allLeaves[updatedEmployee.allLeaves.length - 1]._id;
//         } else {
//           return res
//             .status(400)
//             .send({ message: 'No leaves associated with the employee' });
//         }
//         const superAdmins = await Employee.find({ isSuperAdmin: true });
//         const superAdminEmails = superAdmins.map((admin) => admin.email);
//         transporter.sendMail(
//           {
//             from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
//             // to: `<${req.employee.email}>`,
//             to: superAdminEmails.join(', '),
//             subject: `${employee.NAME} - Leave Request`,
//             html: `
//             <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Email Content</title>
//             <style>
//             body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 20px;
//               background-color: #f5f5f5;
//             }
//             .container {
//               background-color: #ffffff;
//               padding-left: 70px;
//               padding-right: 70px;
//               border-radius: 10px;
//               box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//             }
//             .header {
//               text-align: center;
//             }
//             .image-content {
//               text-align: center;
//             }
//             img {
//               width: 100px;
//               height: 100px;
//               object-fit: contain;
//               display: flex;
//               justify-content: start;
//             }
//             .main-content {
//               margin: 20px 0px;
//             }

//             .main-content a {
//               display: flex;
//               justify-content: center;
//               padding: 10px;
//               text-decoration: none;
//               background: rgb(94, 223, 94);
//               width: 130px;
//               color: #f5f5f5;
//               border-radius: 3px;

//               /* margin: auto; */

//             }

//             .main-content a:hover {
//               background: rgb(76, 214, 71);
//             }
//             .footer {
//               font-size: 12px;
//               text-align: center;
//             }

//             </style>
//         </head>
//         <body>
//         <div class="container">
//         <div class="header">
//           <h2>
//             <img src=${logo} alt="Embedded Image" />
//           </h2>
//         </div>
//         <div class="image-content"></div>
//         <div class="main-content">
//           <p>Dear Sir,</p>
//           <p>
//             This is to inform you that <b>${leaveApplication.name}-[${
//               leaveApplication.employee_id
//             }]</b>,
//             working as <b>${
//               employee.designation
//             }</b>, has requested a leave from
//             <b>
//             ${new Date(leaveApplication.expectedDateOfLeave).toLocaleDateString(
//               'en-GB',
//               {
//                 day: '2-digit',
//                 month: '2-digit',
//                 year: 'numeric',
//               }
//             )}
//            </b> to <b>${new Date(
//              leaveApplication.expectedDateOfreturn
//            ).toLocaleDateString('en-GB', {
//              day: '2-digit',
//              month: '2-digit',
//              year: 'numeric',
//            })}</b> .
//           </p>
//           <p>
//             <b>Reason for Leave:</b>
//             <span>${leaveApplication.reasonInDetail}</span>
//           </p>
//           <p>
//             <b>Employee Contact Details :</b> <br/>
//             <span>Email  :  ${leaveApplication.email}</span> <br/>
//             <span>Mobile :  ${leaveApplication.mobileNo}</span>
//           </p>
//           <p>
//             Kindly review the request and take necessary actions. You can contact
//             the employee directly for any clarifications.
//           </p>
//           <a href='${baseUrl()}/leave-application/${
//               employee._id
//             }' target="blank"> Take Action </a>
//         </div>
//         <div class="footer">
//           <p>This is an auto-generated email. Please do not reply.</p>
//         </div>
//       </div>
//         </body>
//         `,
//           },
//           (error, info) => {
//             if (error) {
//               console.error('Error sending email:', error);
//             } else {
//               console.log('Email sent:', info.response);
//             }
//           }
//         );

//         res.status(201).send({
//           message: 'Leave Application submitted',
//           updatedEmployee, // Return the updated employee document
//         });
//       } else {
//         res.status(400).send({
//           message: `Insufficient ${leaveType} leave balance.`,
//         });
//       }
//     } catch (error) {
//       console.error('Error while processing leave application:', error);
//       res.status(500).send({ message: 'Internal server error' });
//     }
//   })
// );

// ------------------apply for leave-------------------------------

// ------------------------------get all leaves of one employee-----------------------
emplyeeRouter.get('/leaves/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    // Find the employee by ID and retrieve their leaves
    const employee = await Employee.findByPk(employeeId);
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
    const employee = await Employee.findByPk(employeeId);
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
      const employee = await Employee.findByPk(employeeid);

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
      const employee = await Employee.findByPk(id);

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
      const numberOfDays =
        Math.floor(
          (new Date(leaveEntry.expectedDateOfreturn) -
            new Date(leaveEntry.expectedDateOfLeave)) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      // Return the deducted leaves to the employee
      employee[leaveEntry.type] -= numberOfDays; // Return leaves of the specific type
      employee.leaves -= numberOfDays;
      // Update the leave entry with approval details
      leaveEntry.approved = req.body.approved;
      leaveEntry.approvedBy = req.employee.NAME;
      leaveEntry.remark = req.body.remark;
      leaveEntry.approvedAt = new Date();
      leaveEntry.remarkBy = req.employee.NAME;

      // Save the updated employee document
      await employee.save();

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
      const employee = await Employee.findByPk(id);

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
      const numberOfDays =
        Math.floor(
          (new Date(leaveEntry.expectedDateOfreturn) -
            new Date(leaveEntry.expectedDateOfLeave)) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      // // Return the deducted leaves to the employee
      // employee[leaveEntry.type] += numberOfDays; // Return leaves of the specific type
      // employee.leaves += numberOfDays;

      // Update the leave entry with rejection details
      leaveEntry.approved = false;
      leaveEntry.approvedBy = '';
      leaveEntry.remark = req.body.remark;
      leaveEntry.approvedAt = '';
      leaveEntry.remarkBy = req.employee.NAME;

      // Save the updated employee document
      await employee.save();

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

// --------------------all attendence----------------------------------

// emplyeeRouter.get('/attendance/:id', async (req, res) => {
//   const id = req.params.id;
//   // const employee = await Employee.findByPk(id);
//   const attendance = await AttendanceRecord.findById({ emnployee_id: id });

//   // Send the created employees as the response
//   res.send({ attendance });
// });

emplyeeRouter.get('/attendance/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const attendance = await RfidCkeck.findAll({
      where: { employee_id: id },
    });

    res.send({ attendance });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

emplyeeRouter.get('/attendance', async (req, res) => {
  // const employee = await Employee.findByPk(id);
  const attendance = await RfidCkeck.findAll();

  // Send the created employees as the response
  res.send({ attendance });
});

// --------------------all attendence----------------------------------

//old
// emplyeeRouter.get('/birthday-check', async (req, res) => {
//   try {
//     // Get the current date and month
//     const currentDate = new Date();
//     const currentDay = String(currentDate.getDate()).padStart(2, '0');
//     const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

//     const birthdayEmployees = await BirthdayWish.find();

//     const todaysBirthdayEmployees = birthdayEmployees.filter((employee) => {
//       const [day, month] = employee.birthday_date.split('/'); // Ignore the year
//       return day === currentDay && month === currentMonth;
//     });

//     if (todaysBirthdayEmployees) {
//       // Birthday object found

//       res.status(200).json(todaysBirthdayEmployees);
//     } else {
//       // No birthday object found
//       console.log('No Birthday Object Found');
//       res.status(404).json({ message: 'No birthday today.' });
//     }
//   } catch (error) {
//     console.error('Error fetching birthday object:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

//old

// emplyeeRouter.get('/birthday-check', async (req, res) => {
//   try {
//     // Get the current date and month
//     const currentDate = new Date();
//     const currentDay = String(currentDate.getDate()).padStart(2, '0');
//     const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

//     const todaysBirthdayEmployees = await BirthdayWish.find({
//       where: {
//         birthday_date: {
//           [Op.and]: [
//             Sequelize.literal(`DAY(birthday_date) = ${currentDay}`),
//             Sequelize.literal(`MONTH(birthday_date) = ${currentMonth}`),
//           ],
//         },
//       },
//     });

//     if (todaysBirthdayEmployees.length > 0) {
//       // Birthday objects found
//       res.status(200).json(todaysBirthdayEmployees);
//     } else {
//       // No birthday objects found
//       console.log('No Birthday Objects Found');
//       res.status(404).json({ message: 'No birthday today.' });
//     }
//   } catch (error) {
//     console.error('Error fetching birthday objects:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// get individual wishes

emplyeeRouter.get('/birthday-check', async (req, res) => {
  const employee_id = req.params.id;
  try {
    // Find employees with birthdays today and matching employee_id
    const todaysBirthdayEmployee = await BirthdayWish.findAll();

    if (todaysBirthdayEmployee) {
      // Birthday object found
      res.status(200).json(todaysBirthdayEmployee);
    } else {
      // No matching birthday object found
      console.log('No Matching Birthday Object Found');
      res.status(404).json({ message: 'No birthday today for this employee.' });
    }
  } catch (error) {
    console.error('Error fetching birthday object:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

emplyeeRouter.get('/anniversary-check', async (req, res) => {
  try {
    // Find employees with birthdays today and matching employee_id
    const todaysanniversary = await Anniversary.findAll();

    if (todaysanniversary) {
      // Birthday object found
      res.status(200).json(todaysanniversary);
    } else {
      // No matching birthday object found
      console.log('No Matching anniversary Object Found');
      res.status(404).json({ message: 'No anniversary today .' });
    }
  } catch (error) {
    console.error('Error fetching anniversary object:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// emplyeeRouter.post('/post-wish', async (req, res) => {
//   try {
//     const {
//       birthdayBoyId,
//       wishername,
//       wisher_employee_id,
//       wisher_email,
//       wish,
//       wisher_image,
//       BirthdayWishId,
//     } = req.body;

//     // Find the birthday employee by ID
//     // const birthdayEmployee = await BirthdayWish.findByPk(birthdayBoyId);
//     const birthdayEmployee = await BirthdayWish.findOne({
//       where: {
//         birthday_boy_employee_id: birthdayBoyId,
//       },
//     });

//     if (!birthdayEmployee) {
//       return res.status(404).json({ message: 'Birthday employee not found' });
//     }

//     // Add the wish to the birthday employee's wishes array
//     Wish.create({
//       wishername,
//       wisher_employee_id,
//       wisher_email,
//       wish,
//       wisher_image,
//       BirthdayWishId: birthdayBoyId,
//     });

//     // Save the updated birthday employee document
//     await birthdayEmployee.save();

//     res.status(201).json({ message: 'Wish posted successfully' });
//   } catch (error) {
//     console.error('Error posting birthday wish:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// wish reply

// -------------------------reply to specific wish----------------------------
// without email

emplyeeRouter.put('/reply-wish/:employeeId/:wishId', async (req, res) => {
  const employee_id = req.params.employeeId;
  const wish_id = req.params.wishId;
  const reply = req.body.reply; // Assuming the reply message is sent in the request body

  try {
    // Find the employee with the specified employee_id
    const employee = await BirthdayWish.findOneAndUpdate({
      birthday_boy_employee_id: employee_id,
    });

    if (!employee) {
      // Employee not found
      console.log('Employee not found');
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const specificWish = employee.wishes.find((wish) =>
      wish._id.equals(wish_id)
    );

    if (specificWish) {
      // Update the specific wish with the reply message
      specificWish.reply = reply;

      // Save the updated employee document
      await employee.save();
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the  service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });
      transporter
        .sendMail({
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: specificWish.wisher_email,
          subject: 'Thank you!🥂',
          html: `
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Reply to Birthday Wish</title>
                    <!-- Add your CSS styles here -->
                  </head>
                  <body>
                    <div>
                      <p>Hello ${specificWish.wishername},</p>
                      <p>${specificWish.reply}</p>
                       </div>
                  </body>
                  </html>
                `,
        })
        .then((info) => {
          if (info.accepted.includes(specificWish.wisher_email)) {
            console.log(
              `Email successfully sent to ${specificWish.wisher_email}`
            );
          } else {
            console.log(`Failed to send email to ${specificWish.wisher_email}`);
          }
        })
        .catch((error) => {
          console.error(
            `Error sending email to ${specificWish.wisher_email}:`,
            error
          );
        });

      // Respond with the updated wish
      res.status(200).json(specificWish);
    } else {
      // Wish with the given _id not found
      console.log('Wish not found');
      res.status(404).json({ message: 'Wish not found.' });
    }
  } catch (error) {
    console.error('Error replying to wish:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// without email

// emplyeeRouter.put('/reply-wish/:employeeId/:wishId', async (req, res) => {
//   const employee_id = req.params.employeeId;
//   const wish_id = req.params.wishId;
//   const reply = req.body.reply; // Assuming the reply message is sent in the request body

//   try {
//     // Find the employee with the specified employee_id
//     const employee = await BirthdayWish.findOneAndUpdate({
//       birthday_boy_employee_id: employee_id,
//     });

//     if (!employee) {
//       // Employee not found
//       console.log('Employee not found');
//       return res.status(404).json({ message: 'Employee not found.' });
//     }

//     const specificWish = employee.wishes.find((wish) =>
//       wish._id.equals(wish_id)
//     );

//     if (specificWish) {
//       // Update the specific wish with the reply message
//       specificWish.reply = reply;

//       // Save the updated employee document
//       await employee.save();
//       const transporter = nodemailer.createTransport({
//         host: 'smtp.hostinger.com', // Use the  service
//         port: 465,
//         auth: {
//           user: process.env.MAIL_USER, // Your Yandex email address
//           pass: process.env.MAIL_PASS, // Your Yandex email password
//         },
//       });

//       transporter
//         .sendMail({
//           from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
//           to: specificWish.wisher_email,
//           subject: 'Thank you!🥂',
//           html: `
//                   <!DOCTYPE html>
//                   <html lang="en">
//                   <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Reply to Birthday Wish</title>
//                     <!-- Add your CSS styles here -->
//                   </head>
//                   <body>
//                     <div>
//                       <p>Hello ${specificWish.wishername},</p>
//                       <p>${specificWish.reply}</p>
//                        </div>
//                   </body>
//                   </html>
//                 `,
//         })
//         .then((info) => {
//           if (info.accepted.includes(specificWish.wisher_email)) {
//             console.log(
//               `Email successfully sent to ${specificWish.wisher_email}`
//             );
//           } else {
//             console.log(`Failed to send email to ${specificWish.wisher_email}`);
//           }
//         })
//         .catch((error) => {
//           console.error(
//             `Error sending email to ${specificWish.wisher_email}:`,
//             error
//           );
//         });

//       // Respond with the updated wish
//       res.status(200).json(specificWish);
//     } else {
//       // Wish with the given _id not found
//       console.log('Wish not found');
//       res.status(404).json({ message: 'Wish not found.' });
//     }
//   } catch (error) {
//     console.error('Error replying to wish:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// -----------------get specific wish------------------------------------
// emplyeeRouter.get('/get-wish/:employeeId/:wishId', async (req, res) => {
//   const employee_id = req.params.employeeId;
//   const wish_id = req.params.wishId;

//   try {
//     console.log('Employee ID:', employee_id);
//     console.log('Wish ID:', wish_id);

//     // Find the employee with the specified employee_id
//     const employee = await BirthdayWish.findOne({
//       birthday_boy_employee_id: employee_id,
//     });

//     if (!employee) {
//       // Employee not found
//       console.log('Employee not found');
//       return res.status(404).json({ message: 'Employee not found.' });
//     }

//     // Find the specific wish by wish_id in the employee's wishes array
//     const specificWish = employee.wishes.find((wish) =>
//       wish._id.equals(wish_id)
//     );

//     if (specificWish) {
//       // Specific wish found
//       res.status(200).json(specificWish);
//     } else {
//       // Wish with the given _id not found
//       console.log('Wish not found');
//       res.status(404).json({ message: 'Wish not found.' });
//     }
//   } catch (error) {
//     console.error('Error fetching wish:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// -----------------get specific wish------------------------------------

//-------------------------------------Birthday-----------------------

// ------------------add employee new pf salary pt -------------------------------
// --add employee-------------------
emplyeeRouter.post('/', async (req, res) => {
  try {
    const {
      employee_id,
      email,
      NAME,
      UID,
      firstName,
      lastName,
      father_husband_name,
      gender,
      birth_date,
      marital_status,
      address,
      addressProof,
      sub_locality,
      district,
      state,
      pinCode,
      mobile_no,
      nominee_name,
      nominee_relationship,
      nominee_address,
      nominee_sub_locality,
      nominee_district,
      nominee_state,
      nominee_mobile_no,
      nominee_pinCode,
      nominee_email,
      no_of_family_members,
      alternate_mobile_no,
      personal_email,
      aadhar_no,
      pan_number,
      bank_account_no,
      ifsc_code,
      aadhar_card_file,
      pan_card_file,
      bank_account_file,
      pf_account_no,
      resetToken,
      image,
      joiningDate,
      designation,
      age,
      previous_company_name,
      experience,
      experience_letter,
      activate,
      isAdmin,
      isSuperAdmin,
      isSales,
      isScm,
      isDesign,
      isProject,
      isVisitor,
      isProduction,
      isAccountant,
      isHr,
      isSoftwareDevlopment,
      isHardwareDevlopment,
      isDirector,
      isProbation,
      leaves,
      sick,
      privilege,
      casual,
      ctc,
      salarygroup,

      tenth_marksheet,
      tenth_schoolName,
      twelth_or_diploma_marksheet,
      twelth_or_diploma_collegeName,
      under_geaduate_or_post_graduate_marksheet,
      under_geaduate_or_post_graduate_collegeName,
      tenth_grade,
      twelth_or_diploma_grade,
      under_geaduate_or_post_graduate_grade,
      taxRegime,
    } = req.body;

    // Hash the default password
    const defaultPassword = employee_id;
    const hashedPassword = bcrypt.hashSync(defaultPassword, 10); // Use an appropriate saltRounds value

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const basic = ((ctc / 12) * (45 / 100)).toFixed(2);
    const hra = ((basic * 40) / 100).toFixed(2);
    const conveyance = (1600).toFixed(2);
    const medical = (1250).toFixed(2);
    const special = (basic - hra - conveyance - medical).toFixed(2);

    const esi =
      salarygroup === 8 && gross <= 21000
        ? ((gross * 1.75) / 100).toFixed(2)
        : 0;

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
    const standardDeduction = 50000;
    const taxableIncome = ctc - standardDeduction;
    let tds = 0;
    let incomeTax = 0;
    const HealthEduCess = 4 / 100;

    //tds calculatiion

    if (taxRegime === 'old') {
      if (taxableIncome > 1000000) {
        incomeTax = ((taxableIncome - 1000000) * 30) / 100 + 112500;
      } else if (taxableIncome > 500000) {
        incomeTax = ((taxableIncome - 500000) * 20) / 100 + 12500;
      } else if (taxableIncome < 500000) {
        incomeTax = 0;
      }
    }

    if (taxRegime === 'new') {
      if (taxableIncome > 1500000) {
        incomeTax = ((taxableIncome - 1500000) * 30) / 100 + 150000;
      } else if (taxableIncome > 1200000) {
        incomeTax = ((taxableIncome - 1200000) * 20) / 100 + 90000;
      } else if (taxableIncome > 900000) {
        incomeTax = ((taxableIncome - 900000) * 15) / 100 + 45000;
      } else if (taxableIncome > 600000) {
        incomeTax = ((taxableIncome - 600000) * 10) / 100 + 15000;
      } else if (taxableIncome < 600000) {
        incomeTax = 0;
      }
    }
    tds = incomeTax + incomeTax * HealthEduCess;

    console.log(`tds : ${tds}`);
    // Create a new employee instance
    const newEmployee = new Employee({
      employee_id,
      email,
      NAME,
      UID,
      firstName,
      lastName,
      father_husband_name,
      gender,
      birth_date,
      joiningDate,
      marital_status,
      address,
      addressProof,
      sub_locality,
      district,
      state,
      pinCode,
      mobile_no,
      nominee_name,
      nominee_relationship,
      nominee_address,
      nominee_sub_locality,
      nominee_district,
      nominee_state,
      nominee_mobile_no,
      nominee_pinCode,
      nominee_email,
      no_of_family_members,
      alternate_mobile_no,
      personal_email,
      aadhar_no,
      pan_number,
      bank_account_no,
      ifsc_code,
      aadhar_card_file,
      pan_card_file,
      bank_account_file,
      pf_account_no,
      resetToken,
      password: hashedPassword,
      image,
      designation,
      age,
      previous_company_name,
      experience,
      experience_letter,
      activate,
      isAdmin,
      isSuperAdmin,
      isSales,
      isScm,
      isDesign,
      isProject,
      isVisitor,
      isProduction,
      isAccountant,
      isHr,
      isHardwareDevlopment,
      isSoftwareDevlopment,
      isDirector,
      isProbation,
      leaves,
      sick,
      privilege,
      casual,
      tenth_marksheet,
      tenth_schoolName,
      twelth_or_diploma_marksheet,
      twelth_or_diploma_collegeName,
      under_geaduate_or_post_graduate_marksheet,
      under_geaduate_or_post_graduate_collegeName,
      tenth_grade,
      twelth_or_diploma_grade,
      under_geaduate_or_post_graduate_grade,
    });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // Create a new payslip instance
    const newPayslip = new Payslip({
      employee_id,
      email,
      NAME,
      ctc,
      salarygroup,
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
      month: currentMonth,
      year: currentYear,
      taxableIncome: taxableIncome,
      tds: tds,
      taxRegime: taxRegime,
      // ... (other relevant properties for Payslip)
    });

    const savedPayslip = await newPayslip.save();

    // --------------rfid reg
    // Create a new payslip instance
    //  id, UID, NAME, Reg_no, email, Contact_No
    const newRfidReg = new RfidReg({
      UID,
      Reg_no: employee_id,
      // NAME,
      NAME: `${firstName} ${lastName.charAt(0)}`,
      email,
      Contact_No: mobile_no,
    });

    // --------------rfid reg

    const savedRfidReg = await newRfidReg.save();

    const newUIDCard = new UIDCard({
      Name: NAME,
      employee_id: employee_id,
      current_uid: UID,
      prevoius_uid: UID,
      updatedBy: req.body.updatedBy,
    });

    const savednewUIDCard = await newUIDCard.save();

    //leave lapse
    const newLeaveLapse = new LeaveLapse({
      Name: NAME,
      employee_id: employee_id,
      leaves: 18,
      sick: 3,
      privilege: 12,
      casual: 3,
      year: currentYear,
      isLapsed: 0,
      LeavetypeLapsed: '',
      NoofleaveLapsed: 0,
    });

    const savedLeaveLapse = await newLeaveLapse.save();

    // ----------------email---------------------------------

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com', // Use the  service
      port: 465,
      auth: {
        user: process.env.MAIL_USER, // Your Yandex email address
        pass: process.env.MAIL_PASS, // Your Yandex email password
      },
    });
    // >>>>>>> 460b716ae20d84d8d85629c8fb9716827c69046a

    transporter
      .sendMail({
        from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
        to: `${savedEmployee.email},${savedEmployee.personal_email}`,
        subject: 'Welcome Abroad🚀!',
        html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Taypro</title>
    <style>
      /* Add your global styles here */
    </style>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f8f8f8; font-family: Arial, sans-serif;">
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="600"
      style="border-radius: 10px; margin: 10px auto; background-color: #f8f8f8; max-width: 100%;"
    >
      <tr>
        <td  bgcolor="#ffffff" style="padding: 20px;">
          <div style="display: flex; justify-content: flex-end;margin:0px 10px 0px 400px"">
            <img
              src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
              alt="Company Logo"
              height-"120" width="120"
              style=" object-fit: contain; margin: 1px 0px;"
            />
          </div>

          <div style="width: 100%; margin: auto; text-align: center;">
          <img
          src="${savedEmployee.image}"
          alt="Employee Image"
          height="150" width="150"
          style="object-fit: cover; margin: 10px 0; border-radius: 50%; "
        />
        
          </div>

          <p style="padding: 10px 20px;">
            Hi <b style="color: crimson">${savedEmployee.NAME}</b>, Welcome to Taypro! We are excited to have you on board.
          </p>

          <p style="padding: 10px 20px; text-align: center; color: tomato; font-weight: bold;">
            "Your journey with us begins now, and we're here to support you every step of the way."
          </p>

          <p style="padding: 10px 20px;">
            Here are some details about your account
          </p>

          <table style="border-collapse: collapse; width: 80%; margin: auto;">
          <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Employee portal</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <a href="https://employee.taypro.in" target="blank"
              >click here</a
            >
          </td>
        </tr>
        <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Employee ID</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            ${savedEmployee.employee_id}
          </td>
        </tr>
        <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Name</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            ${savedEmployee.NAME}
          </td>
        </tr>
        <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Email</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            ${savedEmployee.email}
          </td>
        </tr>
        <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Designation</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            ${savedEmployee.designation}
          </td>
        </tr>
        <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Date of joining</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            ${savedEmployee.joiningDate}
          </td>
        </tr>
        <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Default password</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            ${savedEmployee.employee_id}
          </td>
        </tr>
          </table>

          <p style="padding: 10px 20px;">
            If you have any questions or need assistance, feel free to contact us.
          </p>

          <p style="padding: 0px 20px;">
            Contact: <b><a href="mailto:hr@taypro.in">hr@taypro.in</a></b>
          </p>
        </td>
      </tr>

      <tr bgcolor="#ffffff">
        <td style="padding: 10px 20px;">
          <br />
          <span style="color: black; font-weight: 600">Best Regards,</span><br />
          <span style="color: crimson; font-weight: 600">HR TAYPRO,</span><br />
          <span style="color: rgb(0, 0, 0); font-weight: 600">TAYPRO PRIVATE LIMITED</span><br />
          <span style="color: green; font-weight: 600"><b>We make green energy greener!!</b></span><br />
        </td>
      </tr>
    </table>
  </body>
</html>

        `,
      })
      .then((info) => {
        if (info.accepted.includes(savedEmployee.email)) {
          console.log(
            `Email successfully sent to ${savedEmployee.email},${savedEmployee.personal_email}`
          );
        } else {
          console.log(
            `Failed to send email to ${savedEmployee.email},${savedEmployee.personal_email}`
          );
        }
      })
      .catch((error) => {
        console.error(
          `Error sending email to ${savedEmployee.email},${savedEmployee.personal_email}:`,
          error
        );
      });
    // ----------------email---------------------------------

    // Send the newly created employee as the response
    res.status(201).json({
      success: true,
      message:
        'Employee Created Successfully ,payslip record created,data added to RFID Reg,UID data added ',
      employee: savedEmployee,
      payslip: savedPayslip,
      RfidReg: savedRfidReg,
      UIDData: savednewUIDCard,
      leavelapse: savedLeaveLapse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: `Failed to add employee. Error details: ${error.message}`,
    });
  }
});

// ------------------add employee new pf salary pt -------------------------------

export default emplyeeRouter;
