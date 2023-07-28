import express from 'express';
import Employee from '../models/employeeModel.js';
import expressAsyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
import { generateToken, baseUrl, mailgun } from '../utils.js';
import jwt from 'jsonwebtoken';

const emplyeeRouter = express.Router();

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
    if (employee && req.body.password === employee.password) {
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
        profileImage: employee.image, // Include the profile image URL
        token: generateToken(employee),
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

      //reset link
      console.log(`${baseUrl()}/reset-password/${token}`);

      mailgun()
        .messages()
        .send(
          {
            from: 'TAYPRO <employee-lwbn@mg.yourdomain.com>',
            to: `${employee.name} <${employee.email}>`,
            subject: `Reset Password`,
            html: ` 
             <p>Please Click the following link to reset your password:</p> 
             <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>
             `,
          },
          (error, body) => {
            console.log(error);
            console.log(body);
          }
        );
      res.send({ message: 'We sent reset password link to your email.' });
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
            employee.password = req.body.password;
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

export default emplyeeRouter;
