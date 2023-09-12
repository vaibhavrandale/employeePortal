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
import AttendanceRecord from '../models/AttendanceRecord.js';

const attendenceRouter = express.Router();

dotenv.config();

const logo =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';
attendenceRouter.post('/checkin/:year/:month/:day/:id', async (req, res) => {
  try {
    const { year, month, day, id } = req.params;

    const user = await Employee.findById(id);
    if (!user) return res.status(404).send('User not found');

    const attendance = new AttendanceRecord({
      user_id: user._id,
      employee_id: user.employee_id,
      username: user.name,
      loginTime: new Date(),
      user_email: user.email,
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      logoutTime: null, // Set logoutTime to null during check-in
      totalHours: 0, // Initialize totalHours to 0 during check-in
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

    const formattedLoginTime = moment(
      attendance.loginTime,
      'YYYY-MM-DDTHH:mm:ss'
    )
      .tz('Asia/Kolkata')
      .format('DD/MM/YYYY h:mm A');

    const transporter = nodemailer.createTransport({
      service: 'Yandex', // Use the Yandex service
      auth: {
        user: process.env.MAIL_USER, // Your Yandex email address
        pass: process.env.MAIL_PASS, // Your Yandex email password
      },
    });
    transporter.sendMail(
      {
        from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
        to: `<${attendance.user_email}>`,
        subject: `Login Successfull✅-${attendance.username} `,
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
      <p>Dear ${attendance.username},  ${getGreeting()}</p>
  
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
          console.log('Email sent:', attendance.user_email, info.response);
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

attendenceRouter.post('/checkout/:year/:month/:day/:id', async (req, res) => {
  try {
    const { year, month, day, id } = req.params;

    // Find the corresponding attendance record for the user on the given date
    const attendance = await AttendanceRecord.findOne({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      user_id: id,
    });

    if (!attendance) return res.status(404).send('Attendance record not found');

    // Update the logoutTime and calculate totalHours during check-out
    attendance.logoutTime = new Date();
    attendance.totalHours =
      (attendance.logoutTime - attendance.loginTime) / (1000 * 60 * 60); // convert milliseconds to hours
    // Save the updated attendance record
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

    const formattedLogoutTime = moment(
      attendance.logoutTime,
      'YYYY-MM-DDTHH:mm:ss'
    )
      .tz('Asia/Kolkata')
      .format('DD/MM/YYYY h:mm A');

    const transporter = nodemailer.createTransport({
      service: 'Yandex', // Use the Yandex service
      auth: {
        user: process.env.MAIL_USER, // Your Yandex email address
        pass: process.env.MAIL_PASS, // Your Yandex email password
      },
    });
    transporter.sendMail(
      {
        from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
        to: `<${attendance.user_email}>`,
        subject: `Logout Successfull✅-${attendance.username} `,
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
        <p>Dear ${attendance.username},  ${getGreeting()}</p>
    
        <p>
          Your Logout is Successfull and your logout time is  <b>${formattedLogoutTime}</b>.
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
          console.log('Email sent:', attendance.user_email, info.response);
        }
      }
    );

    res.status(200).send({
      message: `Logged out Successfully`,
      attendanceDetails: attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

export default attendenceRouter;
