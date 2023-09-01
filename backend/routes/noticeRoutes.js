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
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693544767/bourvup3cg574xxuwjpm.png';

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
      attachments,
      noticeBy,
    } = req.body;
    const notice = new Notice({
      img: logo,
      title,
      date,
      subject,
      description,
      highlightPoints,
      attachments,
      noticeBy,
      mobile_no,
      seal: logo,
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
        subject: `Notice-${title}`,
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
        a{
          text-decoration: none;
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
        
       
        .footer {
          font-size: 12px;
          text-align: center;
        }

        #imageFooter{
          padding:0px;
          margin:0px;
          height:100px;
          width:100px;
          object-fit:contain;
        }
        

.attachment {
  margin-top: 15px;
  display: flex;

  flex-wrap: wrap;
}

.attachment > .inner-attachment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 4px;

  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
}
.attachment > .inner-attachment > img {
  height: 80px;
  width: 80px;

  object-fit: contain;
}
.attachment > span {
  text-decoration: none;
  cursor: pointer;
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
      <p>${description}</p>
      <ul>
        ${highlightPoints
          .map((point, index) => `<li key=${index}>${point}</li>`)
          .join('')}
      </ul>
      <div className="attachment m-1  ">
      
      ${attachments.map(
        (item, index) =>
          `
            <a key=${index}
              href=${item.url}
              class="text-decoration-none m-1 text-center"
              target="blank"
            >
              ${item.label}
            </a>
          `
      )}
    </div>
      <br/>
      <span>Best Regards,</span><br/>
      <span>${noticeBy},</span><br/>
      <span>TAYPRO PRIVATE LIMITED</span><br/>
   <span><b>We make green energy greener!!</b></span><br/>
   
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
    highlightPoints,
    noticeBy,
    mobile_no,
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
  notice.highlightPoints = highlightPoints;
  notice.noticeBy = noticeBy;
  notice.mobile_no = mobile_no;
  notice.seal = seal;
  // Save the updated employee to the database
  const updatednotice = await notice.save();
  // Send the created employees as the response

  res.send({ updatednotice, message: 'Notice updated' });
});

NoticeRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const notice = await Notice.findById(req.params.id);
    if (notice) {
      await notice.deleteOne();
      res.send({ message: 'notice Deleted' });
    } else {
      res.status(404).send({ message: 'notice not found' });
    }
  })
);

export default NoticeRouter;
