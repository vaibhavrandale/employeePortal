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

// emplyeeRouter.post(
//   '/signin',
//   expressAsyncHandler(async (req, res) => {
//     const employee = await Employee.findOne({ email: req.body.email });
//     if (employee && req.body.password === employee.employee_id) {
//       // Code to be executed if the employee ID matches

//       res.send({
//         _id: employee._id,
//         name: employee.name,
//         email: employee.email,
//         isAdmin: employee.isAdmin,
//         activate: employee.activate,
//         token: generateToken(employee),
//       });
//       return;
//     }
//     res.status(401).send({ message: 'Invalid Credentials' });
//   })
// );

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
