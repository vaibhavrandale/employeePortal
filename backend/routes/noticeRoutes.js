import express from 'express';
import Notice from '../models/noticeModel.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Employee from '../models/employeeModel.js';

const NoticeRouter = express.Router();
const logo =
  'https://taypro.in/assets/images/taypro-registered-without-tagline-354x82.png';
dotenv.config();
NoticeRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      img,
      title,
      date,
      subject,
      description,
      briefNotice,
      highlightPoints,
      noticeBy,
      seal,
    } = req.body;
    const notice = new Notice({
      img,
      title,
      date,
      subject,
      description,
      briefNotice,
      highlightPoints,
      noticeBy,
      seal,
    });
    await notice.save();
    // Create a transporter object using Yandex SMTP
    const transporter = nodemailer.createTransport({
      service: 'Yandex', // Use the Yandex service
      auth: {
        user: process.env.MAIL_USER, // Your Yandex email address
        pass: process.env.MAIL_PASS, // Your Yandex email password
      },
    });
    const superAdmins = await Employee.find({ isAdmin: true });
    const superAdminEmails = superAdmins.map((admin) => admin.email);
    transporter.sendMail(
      {
        from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
        // to: `<${req.employee.email}>`,
        to: superAdminEmails.join(', '),
        subject: `New Notice`,
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
        <img src=${logo} alt="Notice Seal" />
      </h2>
      <h3>${title}</h3>
    </div>
    <div class="main-content">
      <p>${briefNotice}</p>
      <ul>
        ${highlightPoints
          .map((point, index) => `<li key=${index}>${point}</li>`)
          .join('')}
      </ul>
      <p>Notice By: ${noticeBy}</p>
      <p>Date: ${date}</p>
    </div>
    <div class="footer">
      <p>This is an auto-generated email. Please do not reply.</p>
    </div>
  </div>
    </body>
    `,
      },
      //   (error, info) => {
      //     if (error) {
      //       console.error('Error sending email:', error);
      //     } else {
      //       console.log('Email sent:', info.response);
      //     }
      //   }
      // );

      (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Notice email sent:', info.response);
        }
      }
    );

    res.send({ message: 'Notice  Created', notice });
  })
);

NoticeRouter.get('/', async (req, res) => {
  const notices = await Notice.find();

  // Send the created employees as the response
  res.send({ notices });
});

NoticeRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  // const employee = await Employee.findById(id);
  const notice = await Notice.findById(id);

  // Send the created employees as the response
  res.send({ notice });
});

NoticeRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {
    img,
    title,
    date,
    subject,
    description,
    briefNotice,
    highlightPoints,
    noticeBy,
    seal,
  } = req.body;
  // const employee = await Employee.findById(id);
  const notice = await Notice.findById(id);
  if (!notice) {
    return res.status(404).json({ success: false, error: 'notice not found' });
  }
  notice.img = img;
  notice.title = title;
  notice.date = date;
  notice.subject = subject;
  notice.description = description;
  notice.briefNotice = briefNotice;
  notice.highlightPoints = highlightPoints;
  notice.noticeBy = noticeBy;
  notice.seal = seal;
  // Save the updated employee to the database
  const updatednotice = await notice.save();
  // Send the created employees as the response

  res.send({ updatednotice, message: 'Notice updated' });
});

export default NoticeRouter;
