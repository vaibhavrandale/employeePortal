import express from 'express';
import Notice from '../models/noticeModel.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Employee from '../models/employeeModel.js';

const NoticeRouter = express.Router();
dotenv.config();
const logo =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709106310/bhyfvfixfscmawtlhg1s.png';

NoticeRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
      title,
      date,
      subject,
      description,
      mobile_no,
      highlightPoints,

      noticeBy,
    } = req.body;

    try {
      const notice = await Notice.create({
        img: logo,
        title,
        date,
        subject,
        description,
        highlightPoints,

        noticeBy,
        mobile_no,
        seal: logo,
      });

      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465, // IMAPS port
        secure: true, // Use secure connection
        auth: {
          user: process.env.MAIL_USER, // Your Hostinger email address
          pass: process.env.MAIL_PASS, // Your Hostinger email password
        },
      });

      const superAdmins = await Employee.findAll({ where: { isAdmin: true } });
      const superAdminEmails = superAdmins.map((admin) => admin.email);

      const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <table
            style="
              width: 500px;
              margin: auto;
              background: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            "
          >
         
            <tr>
              <td style="padding: 10px 20px">
                            
        ${
          subject
            ? `
                <p>${subject}</p>
                `
            : ''
        } ${
        description
          ? `
                <p>${description}</p>
                `
          : ''
      }
                <br />
                <br />
                <div>
                  <span>Thanks and Regards,</span> <br />
                  <!-- <span><spanb>${noticeBy}</spanb></span> -->
                  <b>${noticeBy}</b>
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
      
      

    `;

      transporter.sendMail(
        {
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: superAdminEmails.join(', '),
          subject: `Notice - ${title}`,
          html: emailContent,
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Notice email sent:', info.response);
          }
        }
      );

      res.status(201).send({ message: 'Notice Created', notice });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  })
);

NoticeRouter.get('/', async (req, res) => {
  try {
    const notices = await Notice.findAll();
    res.send({ notices });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

NoticeRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const notice = await Notice.findByPk(id);
    if (notice) {
      res.send({ notice });
    } else {
      res.status(404).send({ message: 'Notice not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

NoticeRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {
    img,
    title,
    date,
    subject,
    description,
    highlightPoints,
    noticeBy,
    mobile_no,
    seal,
  } = req.body;

  try {
    const notice = await Notice.findByPk(id);

    if (!notice) {
      return res
        .status(404)
        .json({ success: false, error: 'Notice not found' });
    }

    notice.img = img;
    notice.title = title;
    notice.date = date;
    notice.subject = subject;
    notice.description = description;
    notice.highlightPoints = highlightPoints;
    notice.noticeBy = noticeBy;
    notice.mobile_no = mobile_no;
    notice.seal = seal;

    // Save the updated notice to the database
    const updatedNotice = await notice.save();

    res.send({ updatedNotice, message: 'Notice updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

NoticeRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
      const notice = await Notice.findByPk(id);

      if (notice) {
        await notice.destroy();
        res.send({ message: 'Notice Deleted' });
      } else {
        res.status(404).send({ message: 'Notice not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  })
);

export default NoticeRouter;
