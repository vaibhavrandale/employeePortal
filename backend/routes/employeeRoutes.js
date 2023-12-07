import express from 'express';
import cron from 'node-cron';
import Employee from '../models/employeeModel.js';
import expressAsyncHandler from 'express-async-handler';
import moment from 'moment-timezone';
import { format } from 'date-fns'; // Import format from date-fns
import BirthdayWish from '../models/BirthdayWish.js';

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
import Attendance from '../models/AttendanceModel.js';
import AttendanceRecord from '../models/AttendanceRecord.js';
// import emoji from '../welcome_image.jpg';

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
// emplyeeRouter.post('/', async (req, res) => {
//   const {
//     employee_id,
//     email,
//     name,
//     firstName,
//     lastName,
//     father_husband_name,
//     gender,
//     birth_date,
//     marital_status,
//     address,
//     sub_locality,
//     district,
//     state,
//     pinCode,
//     mobile_no,
//     nominee_name,
//     nominee_relationship,
//     nominee_address,
//     nominee_sub_locality,
//     nominee_district,
//     nominee_state,
//     nominee_mobile_no,
//     nominee_pinCode,
//     nominee_email,
//     no_of_family_members,
//     alternate_mobile_no,
//     personal_email,
//     aadhar_no,
//     pan_number,
//     bank_account_no,
//     aadhar_card_file,
//     pan_card_file,
//     bank_account_file,
//     pf_account_no,
//     uan_number,
//     resetToken,
//     image,
//     joiningDate,
//     designation,
//     age,
//     previous_company_name,
//     experience,
//     experience_letter,
//     leaves,
//     sick,
//     privilege,
//     casual,
//     activate,
//     isAdmin,
//     isSuperAdmin,
//     isSales,
//     isScm,
//     isDesign,
//     isProject,
//     isVisitor,
//     isProduction,
//     isAccountant,
//     payslips,
//     allLeaves,
//   } = req.body;

//   const defaultPassword = employee_id;
//   const hashedPassword = bcrypt.hashSync(defaultPassword, 10); // Use an appropriate saltRounds value

//   const parseDate = (dateStr) => {
//     let day, month, year;
//     if (dateStr.includes('-')) {
//       [day, month, year] = dateStr.split('-').map(Number);
//     } else if (dateStr.includes('/')) {
//       [day, month, year] = dateStr.split('/').map(Number);
//     } else {
//       return null; // Invalid date format
//     }
//     return new Date(year, month - 1, day);
//   };

//   const parsedBirthDate = parseDate(birth_date);
//   const parsedJoiningDate = parseDate(joiningDate);

//   if (!parsedBirthDate || !parsedJoiningDate) {
//     return res
//       .status(400)
//       .json({ success: false, error: 'Invalid date format' });
//   }

//   // Function to format date as "DD/MM/YYYY"
//   const formatDate = (date) => {
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const formattedBirthDate = formatDate(parsedBirthDate);
//   const formattedJoiningDate = formatDate(parsedJoiningDate);

//   // Create a new Employee instance with the provided data

//   const newEmployee = new Employee({
//     employee_id,
//     email,
//     name,
//     firstName,
//     lastName,
//     father_husband_name,
//     gender,
//     // birth_date,
//     birth_date: formattedBirthDate,
//     joiningDate: formattedJoiningDate,
//     marital_status,
//     address,
//     sub_locality,
//     district,
//     state,
//     pinCode,
//     mobile_no,
//     nominee_name,
//     nominee_relationship,
//     nominee_address,
//     nominee_sub_locality,
//     nominee_district,
//     nominee_state,
//     nominee_mobile_no,
//     nominee_pinCode,
//     nominee_email,
//     no_of_family_members,
//     alternate_mobile_no,
//     personal_email,
//     aadhar_no,
//     pan_number,
//     bank_account_no,
//     aadhar_card_file,
//     pan_card_file,
//     bank_account_file,
//     pf_account_no,
//     uan_number,
//     resetToken,
//     password: hashedPassword,
//     image,
//     // joiningDate,
//     designation,
//     age,
//     previous_company_name,
//     experience,
//     experience_letter,
//     leaves,
//     sick,
//     privilege,
//     casual,
//     activate,
//     isAdmin,
//     isSuperAdmin,
//     isSales,
//     isScm,
//     isDesign,
//     isProject,
//     isVisitor,
//     isProduction,
//     isAccountant,
//     payslips,
//     allLeaves,
//   });

//   try {
//     // Save the new employee to the database
//     const savedEmployee = await newEmployee.save();

//     // Send the newly created employee as the response
//     res.status(201).json({ success: true, employee: savedEmployee,message:"Employee Created Successfully" });
//   } catch (error) {
//     // Handle any errors that may occur during employee creation
//     res.status(500).json({ success: false, error: 'Failed to add employee' });
//   }
// });

// --add employee-------------------

// --------update employee-------------------------
emplyeeRouter.put('/updateemployee/:id', async (req, res) => {
  const { id } = req.params;
  const {
    employee_id,
    email,
    name,
    firstName,
    lastName,
    father_husband_name,
    gender,
    birth_date,
    marital_status,
    address,
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
    aadhar_card_file,
    pan_card_file,
    bank_account_file,
    pf_account_no,
    uan_number,
    resetToken,
    password,
    image,
    joiningDate,
    designation,
    age,
    previous_company_name,
    experience,
    experience_letter,
    ctc,
    salarygroup,
    // leaves,
    // sick,
    // privilege,
    // casual,
    // activate,
    isAdmin,
    isSuperAdmin,
    isSales,
    isScm,
    isDesign,
    isProject,
    isVisitor,
    isProduction,
    isAccountant,
  } = req.body;

  const defaultPassword = employee_id;
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10); // Use an appropriate saltRounds value

  const parseDate = (dateStr) => {
    let day, month, year;
    if (dateStr.includes('-')) {
      [day, month, year] = dateStr.split('-').map(Number);
    } else if (dateStr.includes('/')) {
      [day, month, year] = dateStr.split('/').map(Number);
    } else {
      return null; // Invalid date format
    }
    return new Date(year, month - 1, day);
  };

  const parsedBirthDate = parseDate(birth_date);
  const parsedJoiningDate = parseDate(joiningDate);

  if (!parsedBirthDate || !parsedJoiningDate) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid date format' });
  }

  // Function to format date as "DD/MM/YYYY"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedBirthDate = formatDate(parsedBirthDate);
  const formattedJoiningDate = formatDate(parsedJoiningDate);

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
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    employee.basic = basic;
    employee.ctc = ctc;
    employee.salarygroup = salarygroup;
    employee.hra = hra;
    employee.conveyance = conveyance;
    employee.medical = medical;
    employee.special = special;
    employee.pt = pt;
    employee.pf = pf;
    employee.esi = esi;
    employee.total_deduction = totaldeduction;
    employee.gross = gross;
    employee.netsalary = netsalary;
    employee.employer_pf = employerpf;
    employee.employer_esi = employeresi;
    employee.bonus = bonus;

    employee.employee_id = employee_id;
    employee.email = email;
    employee.name = name;
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.father_husband_name = father_husband_name;
    employee.gender = gender;
    employee.birth_date = formattedBirthDate;
    employee.joiningDate = formattedJoiningDate;
    employee.marital_status = marital_status;
    employee.address = address;
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
    employee.aadhar_card_file = aadhar_card_file;
    employee.pan_card_file = pan_card_file;
    employee.bank_account_file = bank_account_file;
    employee.pf_account_no = pf_account_no;
    employee.uan_number = uan_number;
    employee.resetToken = resetToken;
    employee.image = image;
    employee.password = hashedPassword;
    employee.designation = designation;
    employee.age = age;
    employee.previous_company_name = previous_company_name;
    employee.experience = experience;
    employee.experience_letter = experience_letter;
    // employee.leaves = leaves;
    // employee.sick = sick;
    // employee.privilege = privilege;
    // employee.casual = casual;
    // employee.activate = activate;
    employee.isAdmin = isAdmin;
    employee.isSuperAdmin = isSuperAdmin;
    employee.isSales = isSales;
    employee.isScm = isScm;
    employee.isDesign = isDesign;
    employee.isProject = isProject;
    employee.isVisitor = isVisitor;
    employee.isProduction = isProduction;
    employee.isAccountant = isAccountant;

    // Save the updated employee document
    await employee.save();

    return res
      .status(201)
      .json({ message: `Employee updated successfully.`, employee });
  } catch (error) {
    console.error('Error while updating address:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// --------update employee-------------------------

// ---------------delete employee------------
emplyeeRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);

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
    const deletedEmployee = await employee.deleteOne();
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
        employee_id: employee.employee_id,
        name: employee.name,
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
        activate: employee.activate,
        leaves: employee.leaves,
        sick: employee.sick,
        privilege: employee.privilege,
        casual: employee.casual,
        profileImage: employee.image, // Include the profile image URL
        joiningDate: employee.joiningDate, // Include the profile image URL
        token: generateToken(employee),
        message: 'Sign in successful!', // Success message
      });
      return;
    }

    res.status(401).send({ message: 'Invalid Credentials' });
  })
);

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
        service: 'Hostinger',
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

const logo =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';

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
        // employee[leaveType] -= numberOfDays;
        // employee.leaves -= numberOfDays;
        // Create the leave application

        const leaveApplication = {
          employee_id: employee.employee_id,
          email: employee.email,
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
          service: 'Hostinger',
          auth: {
            user: process.env.MAIL_USER, // Your Yandex email address
            pass: process.env.MAIL_PASS, // Your Yandex email password
          },
        });
        employee.allLeaves.push(leaveApplication);
        const updatedEmployee = await employee.save();

        // Fetch the _id of the last added leave application
        let leaveApplicationId;
        if (updatedEmployee.allLeaves && updatedEmployee.allLeaves.length > 0) {
          leaveApplicationId =
            updatedEmployee.allLeaves[updatedEmployee.allLeaves.length - 1]._id;
        } else {
          return res
            .status(400)
            .send({ message: 'No leaves associated with the employee' });
        }
        const superAdmins = await Employee.find({ isSuperAdmin: true });
        const superAdminEmails = superAdmins.map((admin) => admin.email);
        transporter.sendMail(
          {
            from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
            // to: `<${req.employee.email}>`,
            to: superAdminEmails.join(', '),
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
            <b>Employee Contact Details :</b> <br/>
            <span>Email  :  ${leaveApplication.email}</span> <br/>
            <span>Mobile :  ${leaveApplication.mobileNo}</span>
          </p>
          <p>
            Kindly review the request and take necessary actions. You can contact
            the employee directly for any clarifications.
          </p>
          <a href='${baseUrl()}/leave-application/${
              employee._id
            }' target="blank"> Take Action </a>
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
      leaveEntry.approvedBy = req.employee.name;
      leaveEntry.remark = req.body.remark;
      leaveEntry.approvedAt = new Date();
      leaveEntry.remarkBy = req.employee.name;

      // Save the updated employee document
      await employee.save();
      const transporter = nodemailer.createTransport({
        service: 'Hostinger',
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });
      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${leaveEntry.email}>`,
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
      <p>Dear ${employee.name},</p>
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
      leaveEntry.remarkBy = req.employee.name;

      // Save the updated employee document
      await employee.save();
      const transporter = nodemailer.createTransport({
        service: 'Hostinger',
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });
      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `<${leaveEntry.email}>`,
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
      <p>Dear ${employee.name},</p>
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
            console.log('Email sent:', employee.name, info.response);
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

// ------------------------------------Attendence---------------------------
emplyeeRouter.post('/checkin/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Employee.findById(id);
    if (!user) return res.status(404).send('User not found');

    const attendance = new Attendance({
      userId: user._id,
      employee_id: user.employee_id,
      loginTime: new Date(),
      checkin: true,
      userEmail: user.email,
      userName: user.name,
      joiningDate: user.joiningDate,
    });

    await attendance.save();

    function getGreeting() {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return 'Good morning!';
      } else if (currentHour >= 12 && currentHour < 17) {
        return 'Good afternoon!';
      } else {
        return 'Good evening!';
      }
    }

    const formatDate = (dateStr) => {
      const dateObj = new Date(dateStr);

      // Extracting date and time components
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed in JavaScript
      const year = dateObj.getFullYear();
      const hours = String(dateObj.getHours() % 12 || 12); // Convert 24-hour format to 12-hour format
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const period = dateObj.getHours() >= 12 ? 'PM' : 'AM';

      return `${day}/${month}/${year} ${hours}.${minutes} ${period}`;
    };

    const formattedLoginTime = moment(attendance.loginTime)
      .tz('Asia/Kolkata')
      .format('DD/MM/YYYY h:mm A');
    const transporter = nodemailer.createTransport({
      host: 'imap.hostinger.com',
      port: 993, // IMAPS port
      secure: true, // Use secure connection
      auth: {
        user: process.env.MAIL_USER, // Your Hostinger email address
        pass: process.env.MAIL_PASS, // Your Hostinger email password
      },
    });
    transporter.sendMail(
      {
        from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
        to: `<${attendance.userEmail}>`,
        subject: `Login Successfull✅-${attendance.userName} `,
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
          margin: 10px 0px;
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

        .welcome{
          font-family: 'Arial', sans-serif;
          font-size: 24px;
          font-weight: bold;
          color: #333;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        </style>
    </head>
    <body>
    <div class="container">
    <div class="header">
      <h3>
        <img src=${logo} alt="Embedded Image" />
      </h3>
    </div>

    <h3 class='welcome'>Welcome</h3>

    <div class="main-content">
    <p>Dear ${attendance.userName},  ${getGreeting()}</p>

    <p>
      Your Login is Successfull and your login time is  <b>${formattedLoginTime}</b>.
    </p>
   <p> Thank you ! have a good Day😊</p>

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
          console.log('Email sent:', attendance.userName, info.response);
        }
      }
    );

    res.status(200).send({
      message: `Logged in and attendance marked at ${attendance.loginTime}`,
      attendanceDetails: attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// ---------------------------new-------------------------
// emplyeeRouter.post('/checkin/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await Employee.findById(id);
//     if (!user) return res.status(404).send('User not found');

//     const currentTime = moment().tz('Asia/Kolkata'); // Adjust to your desired timezone

//     const attendance = new Attendance({
//       userId: user._id,
//       employee_id: user.employee_id,
//       loginTime: currentTime.toDate(),
//       checkin: true,
//       userEmail: user.email,
//       userName: user.name,
//       joiningDate: user.joiningDate,
//     });

//     await attendance.save();

//     function getGreeting(time) {
//       // const currentHour = time.hours();
//       if (!time) {
//         console.error('Time object is undefined in getGreeting function');
//         return 'Hello!';
//       }

//       const currentHour = time.hours();

//       if (currentHour >= 5 && currentHour < 12) {
//         return 'Good morning!';
//       } else if (currentHour >= 12 && currentHour < 17) {
//         return 'Good afternoon!';
//       } else if (currentHour >= 17 && currentHour < 21) {
//         return 'Good evening!';
//       } else {
//         return 'Good night!';
//       }
//     }

//     const formatDate = (time) => {
//       return time.format('DD/MM/YYYY h:mm A');
//     };

//     const transporter = nodemailer.createTransport({
//       service: 'Yandex',
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     transporter.sendMail(
//       {
//         from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
//         to: `<${attendance.userEmail}>`,
//         subject: `Login Successful✅-${attendance.userName}`,
//         html: `
//         <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>Email Content</title>
//                 <style>
//                 body {
//                   font-family: Arial, sans-serif;
//                   margin: 0;
//                   padding: 20px;
//                   background-color: #f5f5f5;
//                 }
//                 .container {
//                   background-color: #ffffff;
//                   padding-left: 70px;
//                   padding-right: 70px;
//                   border-radius: 10px;
//                   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//                 }
//                 .header {
//                   text-align: center;
//                 }
//                 .image-content {
//                   text-align: center;
//                 }
//                 img {
//                   width: 100px;
//                   height: 100px;
//                   object-fit: contain;
//                   display: flex;
//                   justify-content: start;
//                 }
//                 .main-content {
//                   margin: 10px 0px;
//                 }

//                 .main-content a {
//                   display: flex;
//                   justify-content: center;
//                   padding: 10px;
//                   text-decoration: none;
//                   background: rgb(94, 223, 94);
//                   width: 130px;
//                   color: #f5f5f5;
//                   border-radius: 3px;

//                   /* margin: auto; */

//                 }

//                 .main-content a:hover {
//                   background: rgb(76, 214, 71);
//                 }
//                 .footer {
//                   font-size: 12px;
//                   text-align: center;
//                 }

//                 .welcome{
//                   font-family: 'Arial', sans-serif;
//                   font-size: 24px;
//                   font-weight: bold;
//                   color: #333;
//                   text-align: center;
//                   text-transform: uppercase;
//                   letter-spacing: 2px;
//                 }
//                 </style>
//             </head>
//             <body>
//             <div class="container">
//             <div class="header">
//               <h3>
//                 <img src=${logo} alt="Embedded Image" />
//               </h3>
//             </div>

//             <h3 class='welcome'>Welcome</h3>

//             <div class="main-content">
//             <p>Dear ${attendance.userName},  ${getGreeting()}</p>

//             <p>
//               Your Login is Successfull and your login time is  <b>${formatDate(
//                 attendance.loginTime
//               )}</b>.
//             </p>
//            <p> Thank you ! have a good Day😊</p>

//             <div class="footer">
//               <p>This is an auto-generated email. Please do not reply.</p>
//             </div>
//           </div>
//             </body>
//         `,
//       },
//       (error, info) => {
//         if (error) {
//           console.error('Error sending email:', error);
//         } else {
//           console.log('Email sent:', attendance.userName, info.response);
//         }
//       }
//     );

//     res.status(200).send({
//       message: `Logged in and attendance marked at ${attendance.loginTime}`,
//       attendanceDetails: attendance,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal server error');
//   }
// });
// ---------------------------new-------------------------

emplyeeRouter.post('/checkout/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Employee.findById(id);
    if (!user) return res.status(404).send('User not found');
    const checkinattendance = await Attendance.findOne({
      userId: user._id,
      logoutTime: null,
    });
    if (!checkinattendance)
      return res.status(400).send('No active login found');
    checkinattendance.logoutTime = new Date();
    checkinattendance.checkin = false;
    checkinattendance.totalHours =
      (checkinattendance.logoutTime - checkinattendance.loginTime) /
      (1000 * 60 * 60); // convert milliseconds to hours

    await checkinattendance.save();
    function getGreeting() {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return 'Good morning!';
      } else if (currentHour >= 12 && currentHour < 17) {
        return 'Good afternoon!';
      } else if (currentHour >= 17 && currentHour < 21) {
        return 'Good evening!';
      } else {
        return 'Good night!';
      }
    }

    const formatDate = (dateStr) => {
      const dateObj = new Date(dateStr);

      // Extracting date and time components
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed in JavaScript
      const year = dateObj.getFullYear();
      const hours = String(dateObj.getHours() % 12 || 12); // Convert 24-hour format to 12-hour format
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const period = dateObj.getHours() >= 12 ? 'PM' : 'AM';

      return `${day}/${month}/${year} ${hours}.${minutes} ${period}`;
    };

    const transporter = nodemailer.createTransport({
      host: 'imap.hostinger.com',
      port: 993, // IMAPS port
      secure: true, // Use secure connection
      auth: {
        user: process.env.MAIL_USER, // Your Hostinger email address
        pass: process.env.MAIL_PASS, // Your Hostinger email password
      },
    });
    transporter.sendMail(
      {
        from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
        to: `<${checkinattendance.userEmail}>`,
        subject: `Logout Successfull✅-${checkinattendance.userName} `,
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
          margin: 10px 0px;
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
        
        .welcome{
          font-family: 'Arial', sans-serif;
          font-size: 24px;
          font-weight: bold;
          color: #333;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        </style>
    </head>
    <body>
    <div class="container">
    <div class="header">
      <h3>
        <img src=${logo} alt="Embedded Image" />
      </h3>
    </div>
  
    <h3 class='welcome'>THANK YOU</h3>
   
    <div class="main-content">
    <p>Dear ${checkinattendance.userName},  ${getGreeting()}</p>
   
    <p>
      Your Logout is Successfull and your logout time is  <b>${formatDate(
        checkinattendance.logoutTime
      )}</b>.
    </p>
   <p> Thank you ! have a good Day😊</p>
  
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
          console.log('Email sent:', checkinattendance.userName, info.response);
        }
      }
    );
    res.status(200).send({
      message: `Logged out at ${checkinattendance.logoutTime}`,
      attendanceDetails: checkinattendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

emplyeeRouter.get('/attendance/:id', async (req, res) => {
  const id = req.params.id;
  // const employee = await Employee.findById(id);
  const attendance = await AttendanceRecord.find({ user_id: id });

  // Send the created employees as the response
  res.send({ attendance });
});
emplyeeRouter.get('/attendance', async (req, res) => {
  // const employee = await Employee.findById(id);
  const attendance = await AttendanceRecord.find();

  // Send the created employees as the response
  res.send({ attendance });
});

// --------------------all attendence----------------------------------

// ------------------------------------Attendence---------------------------
// const birthday =
//   'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693764320/sp5vtxeqnqz4eb7n3gx7.jpg';

// const sendBirthdayEmails = async () => {
//   try {
//     const currentDate = new Date();

//     const currentDay = String(currentDate.getDate()).padStart(2, '0');
//     const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

//     const birthdayEmployees = await Employee.find();

//     const todaysBirthdayEmployees = birthdayEmployees.filter((employee) => {
//       const [day, month] = employee.birth_date.split('/'); // Ignore the year
//       return day === currentDay && month === currentMonth;
//     });

//     console.log(
//       `Found ${todaysBirthdayEmployees.length} employees with birthdays today.`
//     );

//     for (let employee of todaysBirthdayEmployees) {
//       const transporter = nodemailer.createTransport({
//         service: 'Yandex',
//         auth: {
//           user: process.env.MAIL_USER,
//           pass: process.env.MAIL_PASS,
//         },
//       });

//       transporter
//         .sendMail({
//           from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
//           to: employee.email,
//           subject: 'Happy Birthday🥂🎂',
//           html: ` <!DOCTYPE html>
//           <html lang="en">
//           <head>
//               <meta charset="UTF-8">
//               <meta name="viewport" content="width=device-width, initial-scale=1.0">
//               <title>Birthday Wish</title>
//               <style>
//                   @keyframes slideIn {
//                       0% {
//                           transform: translateY(-100%);
//                       }
//                       100% {
//                           transform: translateY(0);
//                       }
//                   }

//                   @keyframes fadeIn {
//                       0% {
//                           opacity: 0;
//                       }
//                       100% {
//                           opacity: 1;
//                       }
//                   }

//                   body {
//                       font-family: Arial, sans-serif;
//                       background-color: #f7f9fc;
//                       padding: 20px;

//                   }

//                   .container {
//                       max-width: 600px;
//                       margin: 0 auto;
//                       background-color: #ffffff;
//                       border-radius: 8px;
//                       overflow: hidden;
//                       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//                       animation: slideIn 1s ease-out, fadeIn 1.5s ease-out;
//                       border:1px solid #ff004f;
//                   }

//                   .header {
//                       background-color: #ff004f;
//                       color: #ffffff;
//                       padding: 20px;
//                       text-align: center;
//                       font-size: 24px;
//                   }

//                   .content {
//                       padding: 20px;
//                   }

//                   .birthday-message {
//                       text-align: center;
//                       font-size: 18px;
//                       margin-bottom: 20px;
//                   }
//                   @keyframes flagWave {
//                     0% {
//                       transform: translateY(0px) skewX(20deg);
//                   }
//                   50% {
//                       transform: translateY(5px) skewX(-20deg);
//                   }
//                   100% {
//                       transform: translateY(0px) skewX(20deg);
//                   }
//                 }

//                   .birthday-image {
//                       display: block;
//                       width: 100%;
//                       max-width: 300px;
//                       margin: 0 auto;
//                       animation: flagWave 0.5s infinite alternate;
//                   }

//                   #name{
//                     color:#ff004f;
//                     font-weight:600;
//                   }
//                   #footer{
//                     padding: 20px;
//                   }
//                   #logoImage{
//                     display: block;
//                     margin: 0 auto;
//                     width: 100px;
//                     height: 50px;
//                     object-fit: contain;

//                   }
//                   #logoContainer{
//                    display:flex;
//                    justify-content:end;
//                    align-items:end;
//                   }
//               </style>
//           </head>
//           <body>

//               <div class="container">

//                   <div class="header">
//                     Happy Birthday!
//                   </div>
//                   <div class="content">
//                   <div id="logoContainer">
//                   <img src=${logo} id="logoImage"  alt="Embedded Image" /></div>
//                       <p class="birthday-message">Hii <b id="name">${employee.name}</b>, Wishing you a day filled with happiness and a year filled with joy.</p>
//                       <p class="birthday-message">May your special day be full of smiles, laughter, and love!</p>
//                       <img src=${birthday} alt="Birthday Celebration" class="birthday-image">
//                         </div>
//                        <div id="footer">
//                        <br/>
//                        <span>Best Regards,</span><br/>

//                        <span>TAYPRO Family</span><br/>
//                     <span><b>We make green energy greener!!</b></span><br/>
//                        </div>
//               </div>
//           </body>
//           </html>
// `,
//         })
//         .then((info) => {
//           if (info.envelope.to.includes(employee.email)) {
//             console.log(
//               `Birthday email successfully sent to ${employee.email}`
//             );
//           } else {
//             console.log(`Failed to send birthday email to ${employee.email}`);
//           }
//         })
//         .catch((error) => {
//           console.error(`Error sending email to ${employee.email}:`, error);
//         });
//     }
//   } catch (error) {
//     console.error('Error sending birthday emails:', error);
//   }
// };

// // Schedule the job
// cron.schedule('0 8 * * *', sendBirthdayEmails);
// // cron.schedule('* * * * *', sendBirthdayEmails);

// cron.schedule('0 8 * * *', async () => {
//   // cron.schedule('* * * * *', async () => {
//   try {
//     const currentDate = new Date();
//     const currentDay = String(currentDate.getDate()).padStart(2, '0');
//     const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

//     const birthdayEmployees = await Employee.find();

//     const todaysBirthdayEmployees = birthdayEmployees.filter((employee) => {
//       const [day, month] = employee.birth_date.split('/'); // Ignore the year
//       return day === currentDay && month === currentMonth;
//     });

//     // Check if there are employees with birthdays today
//     if (todaysBirthdayEmployees.length > 0) {
//       // Create records for each birthday boy with an empty array of wishes
//       const birthdayRecords = todaysBirthdayEmployees.map((employee) => ({
//         birthday_boy: `${employee.name}`,
//         birthday_date: `${employee.birth_date}`,
//         birthday_boy_email: employee.email,
//         birthday_boy_employee_id: employee.employee_id,
//         birthday_boy_image: employee.image,
//         wishes: [],
//       }));

//       // Insert the records into the BirthdayWish collection
//       await BirthdayWish.insertMany(birthdayRecords);

//       console.log(`Birthday records created.`);
//     } else {
//       console.log('No birthdays today.');
//     }
//   } catch (error) {
//     console.error('Error checking and creating birthday records:', error);
//   }
// });

emplyeeRouter.get('/birthday-check', async (req, res) => {
  try {
    // Get the current date and month
    const currentDate = new Date();
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    const birthdayEmployees = await BirthdayWish.find();

    const todaysBirthdayEmployees = birthdayEmployees.filter((employee) => {
      const [day, month] = employee.birthday_date.split('/'); // Ignore the year
      return day === currentDay && month === currentMonth;
    });

    if (todaysBirthdayEmployees) {
      // Birthday object found

      res.status(200).json(todaysBirthdayEmployees);
    } else {
      // No birthday object found
      console.log('No Birthday Object Found');
      res.status(404).json({ message: 'No birthday today.' });
    }
  } catch (error) {
    console.error('Error fetching birthday object:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get individual wishes
emplyeeRouter.get('/birthday-check/:id', async (req, res) => {
  const employee_id = req.params.id;

  try {
    // Find employees with birthdays today and matching employee_id
    const todaysBirthdayEmployee = await BirthdayWish.findOne({
      birthday_boy_employee_id: employee_id,
    });

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

emplyeeRouter.post('/post-wish', async (req, res) => {
  try {
    const {
      birthdayBoyId,
      wishername,
      wisher_employee_id,
      wisher_email,
      wish,
      wisher_image,
    } = req.body;

    // Find the birthday employee by ID
    const birthdayEmployee = await BirthdayWish.findById(birthdayBoyId);

    if (!birthdayEmployee) {
      return res.status(404).json({ message: 'Birthday employee not found' });
    }

    // Add the wish to the birthday employee's wishes array
    birthdayEmployee.wishes.push({
      wishername,
      wisher_employee_id,
      wisher_email,
      wish,
      wisher_image,
    });

    // Save the updated birthday employee document
    await birthdayEmployee.save();

    res.status(201).json({ message: 'Wish posted successfully' });
  } catch (error) {
    console.error('Error posting birthday wish:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
        service: 'Yandex',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
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
//         service: 'Yandex',
//         auth: {
//           user: process.env.MAIL_USER,
//           pass: process.env.MAIL_PASS,
//         },
//       });

//       // Define the email content using the HTML template
//       const emailContent = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Reply to Birthday Wish</title>
//           <!-- Add your CSS styles here -->
//         </head>
//         <body>
//           <div>
//             <p>Hello ${specificWish.wishername},</p>
//             <p>Here is your reply: ${specificWish.reply}</p>
//             <!-- You can add more content here as needed -->
//           </div>
//         </body>
//         </html>
//       `;

//       // Send the email to the wisher
//       transporter
//         .sendMail({
//           from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
//           to: specificWish.wisher_email,
//           subject: 'Thank you!🥂',
//           html: emailContent,
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
// -------------------------reply to specific wish----------------------------

// -----------------get specific wish------------------------------------
emplyeeRouter.get('/get-wish/:employeeId/:wishId', async (req, res) => {
  const employee_id = req.params.employeeId;
  const wish_id = req.params.wishId;

  try {
    console.log('Employee ID:', employee_id);
    console.log('Wish ID:', wish_id);

    // Find the employee with the specified employee_id
    const employee = await BirthdayWish.findOne({
      birthday_boy_employee_id: employee_id,
    });

    if (!employee) {
      // Employee not found
      console.log('Employee not found');
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Find the specific wish by wish_id in the employee's wishes array
    const specificWish = employee.wishes.find((wish) =>
      wish._id.equals(wish_id)
    );

    if (specificWish) {
      // Specific wish found
      res.status(200).json(specificWish);
    } else {
      // Wish with the given _id not found
      console.log('Wish not found');
      res.status(404).json({ message: 'Wish not found.' });
    }
  } catch (error) {
    console.error('Error fetching wish:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// -----------------get specific wish------------------------------------

//-------------------------------------Birthday-----------------------

// ------------------add employee new pf salary pt -------------------------------
// --add employee-------------------
emplyeeRouter.post('/', async (req, res) => {
  const {
    employee_id,
    email,
    name,
    firstName,
    lastName,
    father_husband_name,
    gender,
    birth_date,
    marital_status,
    address,
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
    aadhar_card_file,
    pan_card_file,
    bank_account_file,
    pf_account_no,
    uan_number,
    resetToken,
    image,
    joiningDate,
    designation,
    age,
    previous_company_name,
    experience,
    experience_letter,
    leaves,
    sick,
    privilege,
    casual,
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
    payslips,
    allLeaves,
    ctc,
    salarygroup,
  } = req.body;

  const defaultPassword = employee_id;
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10); // Use an appropriate saltRounds value

  const parseDate = (dateStr) => {
    let day, month, year;
    if (dateStr.includes('-')) {
      [day, month, year] = dateStr.split('-').map(Number);
    } else if (dateStr.includes('/')) {
      [day, month, year] = dateStr.split('/').map(Number);
    } else {
      return null; // Invalid date format
    }
    return new Date(year, month - 1, day);
  };

  const parsedBirthDate = parseDate(birth_date);
  const parsedJoiningDate = parseDate(joiningDate);

  if (!parsedBirthDate || !parsedJoiningDate) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid date format' });
  }

  // Function to format date as "DD/MM/YYYY"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedBirthDate = formatDate(parsedBirthDate);
  const formattedJoiningDate = formatDate(parsedJoiningDate);

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

  // Create a new Employee instance with the provided data

  const newEmployee = new Employee({
    employee_id,
    email,
    name,
    firstName,
    lastName,
    father_husband_name,
    gender,
    // birth_date,
    birth_date: formattedBirthDate,
    joiningDate: formattedJoiningDate,
    marital_status,
    address,
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
    aadhar_card_file,
    pan_card_file,
    bank_account_file,
    pf_account_no,
    uan_number,
    resetToken,
    password: hashedPassword,
    image,
    // joiningDate,
    designation,
    age,
    previous_company_name,
    experience,
    experience_letter,
    leaves,
    sick,
    privilege,
    casual,
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
    payslips,
    allLeaves,
    basic,
    ctc,
    salarygroup,
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

  try {
    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // ----------------email---------------------------------
    const transporter = nodemailer.createTransport({
      service: 'Yandex',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    transporter
      .sendMail({
        from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
        to: savedEmployee.email,
        subject: 'Welcome Abroad🚀!',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Taypro</title>
          <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
            background-color: #f5f5f5;
          }
          .container {
            background-color: #ffffff;
            padding-left: 20px;
            padding-right: 20px;
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
        a{
          text-decoration:"none"
        }
           
        
            p {
              color: #333;
              font-size: 16px;
              margin-bottom: 20px;
            }
        
            .footer {
              font-size: 12px;
              text-align: center;
              padding:10px 0px 20px 10px;
            }
       
            #name{
              color:#ff004f;
              font-weight:600;
            }
            #message{
              color:#006600;
              font-weight:600;
            }
          </style>
        </head>
        <body>

       
          <div class="container">
          <div class="header">
          <h2>
            <img src=${logo} alt="Embedded Image" />
          </h2>
        
            <p>Hii <b id="name">${savedEmployee.name}</b>,Welcome to Taypro! We are excited to have you on board.</p>
        
            <p><b id="message"><em>"Your journey with us begins now, and we're here to support you every step of the way."</em></b></p>
       
            <p>Here are some details about your account</p>

            <table style=" border-collapse: collapse; width: 100%;">
           
            <tr>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Employee portal</strong></td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><a href="https://employee.taypro.in" target="blank">https://employee.taypro.in</a></td>
            </tr>
            <tr>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Employee ID</strong></td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${savedEmployee.employee_id}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Name</strong></td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${savedEmployee.name}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Email</strong></td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${savedEmployee.email}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Designation</strong></td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${savedEmployee.designation}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Date of joining</strong></td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${savedEmployee.joiningDate}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"><strong>Default password</strong></td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${savedEmployee.employee_id}</td>
            </tr>
            <!-- Add more rows as needed -->
          </table>
          
         <p> If you have any questions or need assistance, feel free to contact us.</p>
          </div>
          <div id="footer">
          <br/>
          <span>Best Regards,</span><br/>
          <span>TAYPRO PRIVATE LIMITED</span><br/>
       <span><b>We make green energy greener!!</b></span><br/>
          </div>
        </body>
        </html>
          `,
      })
      .then((info) => {
        if (info.accepted.includes(savedEmployee.email)) {
          console.log(`Email successfully sent to ${savedEmployee.email}`);
        } else {
          console.log(`Failed to send email to ${savedEmployee.email}`);
        }
      })
      .catch((error) => {
        console.error(`Error sending email to ${savedEmployee.email}:`, error);
      });
    // ----------------email---------------------------------

    // Send the newly created employee as the response
    res.status(201).json({
      success: true,
      employee: savedEmployee,
      message: 'Employee Created Successfully',
    });
  } catch (error) {
    // Handle any errors that may occur during employee creation
    res.status(500).json({ success: false, error: 'Failed to add employee' });
  }
});
// ------------------add employee new pf salary pt -------------------------------

export default emplyeeRouter;
