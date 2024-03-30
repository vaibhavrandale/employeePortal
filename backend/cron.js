import Employee from './models/employeeModel.js';
import Payslip from './models/Payslip.js';
import BirthdayWish from './models/BirthdayWish.js';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';
import Anniversary from './models/Anniversary.js';
import sequelize from './config/database.js';
import Leaves from './models/LeaveModel.js';
import RfidCkeck from './models/RfidCkeck.js';
import cron from 'node-cron';
import Holidays from './models/Holidays.js';

const birthday =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693764320/sp5vtxeqnqz4eb7n3gx7.jpg';

const logo =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png';

const sendBirthdayEmails = async () => {
  try {
    const currentDate = new Date();

    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    const birthdayEmployees = await Employee.findAll();

    const todaysBirthdayEmployees = birthdayEmployees.filter((employee) => {
      const [day, month] = employee.birth_date.split('/'); // Ignore the year
      return day === currentDay && month === currentMonth;
    });

    console.log(
      `Found ${todaysBirthdayEmployees.length} employees with birthday today.`
    );

    for (let employee of todaysBirthdayEmployees) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the Yandex service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter
        .sendMail({
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: `${employee.email},${employee.personal_email}`,
          subject: 'Happy Birthday🥂🎂',
          html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Birthday Wishes</title>
            </head>
          
            <body style="">
              <div
                class="container"
                style="
                  min-height: 100vh;
                  border-radius: 10px;
          
                  max-width: 710px;
                  margin: 1vh auto;
          
                  color: #000;
                  padding: 10px;
                "
              >
                <div
                  style="
                    background: url('https://images.unsplash.com/photo-1551892644-51a6e2e8fc65?q=80&w=1594&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
                      center no-repeat;
                    border-radius: 10px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    padding: 10px;
                  "
                >
                  <div id="logo" style="display: flex; justify-content: end">
                    <img
                      src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709278591/pjprlwmrv9dwtbel1rti.png"
                      alt="logo"
                      style="
                        max-width: 12vmax;
                        height: 5vmax;
                        margin-right: 5vmax;
                        margin-top: 2vmax;
                        object-fit: contain;
                      "
                    />
                  </div>
          
                  <p
                    style="
                      font-size: 1vmax;
                      margin: 2vmax 4vmax;
                      font-size: 17px;
                      font-weight: 500;
                      text-align: justify;
                      line-height: 30px;
                      opacity: 1.5;
                      color: #fff;
                    "
                  >
                    Dear <b style="color: crimson">${employee.NAME},</b><br /><br />
          
                    <b style="color: turquoise; background: transparent"
                      >Happy birthday!</b
                    >
                    <br /><br />
          
                    On this special day, we wanted to take a moment to celebrate you and
                    wish you a day filled with joy, laughter, and wonderful memories. May
                    this new year of your life bring you happiness and success in all your
                    endeavors. As a valued member of our team, we appreciate your
                    dedication, hard work, and positive attitude. Your contributions have
                    made a significant impact on our organization, and we are grateful to
                    have you on board.
                    <br />
                    <br />
          
                    <b>Best wishes.</b><br />
                    Thank You
                  </p>
                  <hr />
                  <div
                    class="editor-text about-text"
                    style="
                      font-family: Georgia, 'Times New Roman', Times, serif;
                      font-size: 13px;
                      padding: 10px;
                      text-align: center;
                      color: #ffffff;
                      display: block;
                      word-wrap: break-word;
                    "
                  >
                    <span>
                      Plot No 91, Sector 10, MIDC, Bhosari, Pune, Pimpri-Chinchwad,
                      Maharashtra 411026
                    </span>
                  </div>
                  <div class="social" style="display: flex; justify-content: center">
                    <a href="" style="margin: 0px 5px"
                      ><img
                        style="
                          display: inline-block;
                          height: 24px;
                          width: 24px;
                          padding: 0;
                          margin-top: 10px;
                        "
                        src="https://imgssl.constantcontact.com/galileo/images/templates/Galileo-SocialMedia/facebook-visit-default.png"
                        alt="Facebook"
                    /></a>
                    <a href="" style="margin: 0px 5px"
                      ><img
                        style="
                          display: inline-block;
                          height: 24px;
                          width: 24px;
                          padding: 0;
                          margin-top: 10px;
                        "
                        src="https://imgssl.constantcontact.com/galileo/images/templates/Galileo-SocialMedia/twitter-visit-default.png"
                        alt="Twitter"
                    /></a>
                    <a href="" style="margin: 0px 5px"
                      ><img
                        style="
                          display: inline-block;
                          height: 24px;
                          width: 24px;
                          padding: 0;
                          margin-top: 10px;
                        "
                        src="https://imgssl.constantcontact.com/galileo/images/templates/Galileo-SocialMedia/linkedin-visit-default.png"
                        alt="LinkedIn"
                    /></a>
                  </div>
                  <div
                    class="spacer-base"
                    style="padding-bottom: 10px; display: block; height: 1px; width: 5px"
                  >
                    <img
                      src="https://imgssl.constantcontact.com/letters/images/sys/S.gif"
                      alt=""
                      style="display: block; height: 1px; width: 5px"
                    />
                  </div>
                </div>
              </div>
            </body>
          </html>
          
          
`,
        })
        .then((info) => {
          if (info.envelope.to.includes(employee.email)) {
            console.log(
              `Birthday email successfully sent to ${employee.email}`
            );
          } else {
            console.log(`Failed to send birthday email to ${employee.email}`);
          }
        })
        .catch((error) => {
          console.error(`Error sending email to ${employee.email}:`, error);
        });
    }
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
};

const sendEmail = (employee) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Use the Yandex service
    port: 465,
    auth: {
      user: process.env.MAIL_USER, // Your Yandex email address
      pass: process.env.MAIL_PASS, // Your Yandex email password
    },
  });

  transporter
    .sendMail({
      from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
      to: employee.email,
      subject: 'Happy Birthday🥂🎂',
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Birthday Wishes</title>
        </head>
      
        <body style="background-color: rgba(223, 220, 220, 0.47)">
          <div
            class="container"
            style="
              min-height: 100vh;
              border-radius: 10px;
      
              max-width: 710px;
              margin: 1vh auto;
      
              color: #000;
              padding: 10px;
            "
          >
            <div
              style="
                background: url('https://images.unsplash.com/photo-1551892644-51a6e2e8fc65?q=80&w=1594&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
                  center no-repeat;
                border-radius: 10px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                padding: 10px;
              "
            >
              <div id="logo" style="display: flex; justify-content: end">
                <img
                  src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
                  alt="logo"
                  style="
                    max-width: 13vmax;
                    height: 5vmax;
                    margin-right: 5vmax;
                    margin-top: 2vmax;
                    object-fit: contain;
                    filter: invert(1);
                  "
                />
              </div>
      
              <p
                style="
                  font-size: 1vmax;
                  margin: 2vmax 4vmax;
                  font-size: 17px;
                  font-weight: 500;
                  text-align: justify;
                  line-height: 30px;
                  opacity: 1.5;
                  color: #fff;
                "
              >
                Dear <b style="color: crimson">${employee.NAME},</b><br /><br />
      
                <b style="color: turquoise">Happy birthday!</b> <br /><br />
      
                On this special day, we wanted to take a moment to celebrate you and
                wish you a day filled with joy, laughter, and wonderful memories. May
                this new year of your life bring you happiness and success in all your
                endeavors. As a valued member of our team, we appreciate your
                dedication, hard work, and positive attitude. Your contributions have
                made a significant impact on our organization, and we are grateful to
                have you on board.
                <br />
                <br />
      
                <b>Best wishes.</b><br />
                Thank You
              </p>
            </div>
          </div>
        </body>
      </html>
      
    
    >`,
    })
    .then((info) => {
      console.log(`Birthday email successfully sent to ${employee.email}`);
    })
    .catch((error) => {
      console.error(`Error sending email to ${employee.email}:`, error);
    });
};

const checkAndCreateBirthdayRecords = async () => {
  console.log('checkAndCreateBirthdayRecords function reached');
  // cron.schedule('* * * * *', async () => {
  try {
    const currentDate = new Date();
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    const birthdayEmployees = await Employee.findAll();

    const todaysBirthdayEmployees = birthdayEmployees.filter((employee) => {
      const [day, month] = employee.birth_date.split('/'); // Ignore the year
      return day === currentDay && month === currentMonth;
    });

    // Check if there are employees with birthdays today
    if (todaysBirthdayEmployees.length > 0) {
      // Create records for each birthday boy with an empty array of wishes
      const birthdayRecords = todaysBirthdayEmployees.map((employee) => ({
        birthday_boy: `${employee.NAME}`,
        birthday_date: `${employee.birth_date}`,
        birthday_boy_email: employee.email,
        birthday_boy_employee_id: employee.employee_id,
        birthday_boy_image: employee.image,
      }));

      // Insert the records into the BirthdayWish collection
      // await BirthdayWish.insertMany(birthdayRecords);
      await BirthdayWish.bulkCreate(birthdayRecords);

      console.log(`Birthday records created.`);
    } else {
      console.log('No Employee Has birthdays today.');
    }
  } catch (error) {
    console.error('Error checking and creating birthday records:', error);
  }
};

const AnniversaryEmails = async () => {
  try {
    const currentDate = new Date();

    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    const anniversaryEmployees = await Employee.findAll();

    const todaysanniversaryEmployees = anniversaryEmployees.filter(
      (employee) => {
        const [day, month] = employee.joiningDate.split('/'); // Ignore the year
        return day === currentDay && month === currentMonth;
      }
    );

    console.log(
      `Found ${todaysanniversaryEmployees.length} employees with anniversary today.`
    );

    // Check if there are employees with birthdays today
    if (todaysanniversaryEmployees.length > 0) {
      // Create records for each birthday boy with an empty array of wishes
      const todaysAnniversaryRecords = todaysanniversaryEmployees.map(
        (employee) => ({
          anniversary_employee_name: `${employee.NAME}`,
          anniversary_employee_joining_date: `${employee.joiningDate}`,
          anniversary_employee_email: employee.email,
          anniversary_employee_employee_id: employee.employee_id,
          anniversary_employee_image: employee.image,
        })
      );

      // Insert the records into the BirthdayWish collection
      // await BirthdayWish.insertMany(birthdayRecords);
      await Anniversary.bulkCreate(todaysAnniversaryRecords);

      console.log(`Anniversary records created.`);
    } else {
      console.log('No employee Has Anniversary today.');
    }

    for (let employee of todaysanniversaryEmployees) {
      const joiningDate = new Date(
        employee.joiningDate.replace(/(\d{2})\/(\d{2})/, '$2/$1')
      ); // Adjust date format
      const anniversaryYears =
        currentDate.getFullYear() - joiningDate.getFullYear();

      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the Yandex service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter
        .sendMail({
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,

          to: `${employee.email},${employee.personal_email}`,
          subject: 'Happy Anniversary🎉🎉',
          html: `<!DOCTYPE html>
                    <html lang="en">
                      <head>
                        <style></style>
                      </head>
                      <body
                        class="body"
                        style="
                          width: 100%;
                          margin: 0;
                          padding: 0;
                          -webkit-text-size-adjust: 100%;
                          -ms-text-size-adjust: 100%;
                          text-align: center;
                        "
                      >
                        <div class="template-body" style="text-align: center">
                          <div class="bgcolor" style="background-color: #ffffff">
                            <div class="main-width" style="width: 500px; margin: auto">
                              <div class="layout" style="padding: 15px 5px">
                                <div
                                  class="layout-container-border"
                                  style="background-color: #5b61ab"
                                >
                                  <div
                                    class="layout-container"
                                    style="padding: 0; background-color: #d0dff7"
                                  >
                                    <div class="content" style="width: 100%">
                                      <img
                                        class="anniversary-img"
                                        style="object-fit: contain; width: 80%"
                                        src="https://imgssl.constantcontact.com/letters/images/PT20484/hero.png"
                                        alt=""
                                      />
                                    </div>
                    
                                    <div class="image">
                                      <img
                                        src=${employee.image}
                                        height="140px"
                                        width="140px"
                                        style="border-radius: 50%; object-fit: cover"
                                        alt=""
                                      />
                                    </div>
                    
                                    <div
                                      class=""
                                      style="
                                        margin: 10px 0px;
                                        font-style: oblique;
                                        font-size:17px;
                                        color: #ef4e37;
                                        font-weight: 600;
                                      "
                                    >
                                      We appreciate you -
                                      <span
                                        style="color: #ef4e37; font-size: 24px; font-style: normal"
                                      >
                                        ${employee.NAME}</span
                                      >
                                    </div>
            <div
              class="center-text"
              style="text-align: center; padding: 10px; text-align: justify"
            >
              <div
                class="paragraph"
                style="
                  color: rgb(22, 21, 23);
                  font-weight: 600;
                  margin: 0px 30px;
                  font-style: oblique;
                "
              >
                Celebrating ${anniversaryYears} ${
            anniversaryYears === 1 ? 'year' : 'years'
          } of your invaluable commitment and
                exceptional contributions! Your hard work and dedication
                have significantly shaped our success. Thank you for your
                continued passion and excellence. Happy work anniversary,
                and here's to many more years of shared achievements and
                milestones!
              </div>
            </div>
            <div
            class="divider-base divider-solid"
            style="padding: 4px 0px"
          >
            <div style="width: 65%; margin: 0 auto">
              <img
                src="https://imgssl.constantcontact.com/letters/images/sys/S.gif"
                alt=""
                style="display: block; height: 1px; width: 5px"
              />
            </div>
          </div>
          <div class="content" style="width: 100%">
            <div>
              <img
                class="logo"
                style="width: 120px; margin: 15px"
                src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
                alt=""
              />
            </div>
            <div
              class="editor-text about-text"
              style="
                font-family: Georgia, 'Times New Roman', Times, serif;
                font-size: 12px;
                padding: 10px;
                text-align: center;
                color: #606d78;
                display: block;
                word-wrap: break-word;
              "
            >
              <span>
                Plot No 91, Sector 10, MIDC, Bhosari, Pune,
                Pimpri-Chinchwad, Maharashtra 411026
              </span>
            </div>
            <div class="social" style="background-color: #d0dff7">
              <a href=""
                ><img
                  style="
                    display: inline-block;
                    height: 20px;
                    width: 20px;
                    padding: 0;
                    margin-top: 10px;
                  "
                  src="https://imgssl.constantcontact.com/galileo/images/templates/Galileo-SocialMedia/facebook-visit-default.png"
                  alt="Facebook"
              /></a>
              <a href=""
                ><img
                  style="
                    display: inline-block;
                    height: 20px;
                    width: 20px;
                    padding: 0;
                    margin-top: 10px;
                  "
                  src="https://imgssl.constantcontact.com/galileo/images/templates/Galileo-SocialMedia/twitter-visit-default.png"
                  alt="Twitter"
              /></a>
              <a href=""
                ><img
                  style="
                    display: inline-block;
                    height: 20px;
                    width: 20px;
                    padding: 0;
                    margin-top: 10px;
                  "
                  src="https://imgssl.constantcontact.com/galileo/images/templates/Galileo-SocialMedia/linkedin-visit-default.png"
                  alt="LinkedIn"
              /></a>
            </div>
            <div
              class="spacer-base"
              style="
                padding-bottom: 10px;
                display: block;
                height: 1px;
                width: 5px;
              "
            >
              <img
                src="https://imgssl.constantcontact.com/letters/images/sys/S.gif"
                alt=""
                style="display: block; height: 1px; width: 5px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</body>
</html>
            `,
        })
        .then((info) => {
          if (info.envelope.to.includes(employee.email)) {
            console.log(
              `Anniversary email successfully sent to ${employee.email},${employee.personal_email}`
            );
          } else {
            console.log(
              `Failed to send Anniversary email to ${employee.email},${employee.personal_email}`
            );
          }
        })
        .catch((error) => {
          console.error(
            `Error sending email to ${employee.email},${employee.personal_email}:`,
            error
          );
        });
    }
  } catch (error) {
    console.error('Error sending Anniversary emails:', error);
  }
};

const Intern = () => {
  const Email = 'niranjan.y@taypro.in';
  const name = 'Niranjan Yadav';
  // const Email = 'vaibhav.randale@taypro.in';
  // const name = 'Vaibhav Randale';
  // ----------------email---------------------------------
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
      to: Email,
      subject: 'Welcome Abroad🚀!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to Taypro</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 10px;
                background-color: #f5f5f5;
              }
              .container {
                max-height: 150vh;
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding-left: 20px;
                padding-right: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
              }
              .image-content {
                text-align: center;
              }
              #img {
                width: 100px;
                height: 100px;
                object-fit: contain;
                display: flex;
                justify-content: end;
              }
              a {
                text-decoration: none;
                color: #1502e0;
              }
        
              p {
                color: #333;
                font-size: 16px;
                margin-bottom: 20px;
              }
        
              .footer {
                font-size: 12px;
                text-align: center;
                padding: 10px 0px 20px 10px;
              }
        
              #name {
                color: #ff004f;
                font-weight: 600;
              }
              #message {
                color: #006600;
                font-weight: 600;
              }
              #footer span {
                display: flex;
                flex-direction: column;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>
                <img
                  id="img"
                  style="width: 30%; margin: auto;"
                  src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
                  alt="Embedded Image"
                  class="birthday-image"
                />
              </h2>
        
              <p>
                Hii <b id="name">${name}</b>,Welcome to Taypro! We are excited to
                have you on board.
              </p>
        
              <p>
                <b id="message"
                  ><em
                    >"Your journey with us begins now, and we're here to support you
                    every step of the way."</em
                  ></b
                >
              </p>
        
              <p>Here are some details about your account</p>
        
              <table style="border-collapse: collapse; width: 70%">
                <tr>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <strong>Email portal</strong>
                  </td>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <a href="https://mail.hostinger.com/" target="blank">click here</a>
                  </td>
                </tr>
        
                <tr>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <strong>Name</strong>
                  </td>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <strong>Email</strong>
                  </td>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    ${Email}
                  </td>
                </tr>
                <tr>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <strong>Designation</strong>
                  </td>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    Web development Intern
                  </td>
                </tr>
                <tr>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <strong>Date of joining</strong>
                  </td>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    09/01/2024
                  </td>
                </tr>
                <tr>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <strong>password</strong>
                  </td>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    Taypro@2019
                  </td>
                </tr>
                <tr>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <strong>Study Material</strong>
                  </td>
                  <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
                    <a
                      href="https://docs.google.com/spreadsheets/d/1QgcUHrrhCULarl0z86cEkRyxZeSqIpI4EbGCiH2L9L8/edit?usp=sharing"
                      target="blank"
                      >click here</a
                    >
                  </td>
                </tr>
              </table>
        
              <p style="margin:10px 0px">
                If you have any questions or need assistance, feel free to contact us.
              </p>
              <div id="footer">
                <span style="padding: 4px 0px 0px 0px">Best Regards,</span>
                <span style="padding: 4px 0px 0px 0px"><b>Vaibhav Randale</b></span>
                <span style="padding: 4px 0px 0px 0px"
                  ><b>TAYPRO PRIVATE LIMITED</b></span
                >
                <span style="padding: 4px 0px 0px 0px; color: #006600"
                  ><b>We make green energy greener!!</b></span
                >
              </div>
            </div>
          </body>
        </html>
        
          `,
    })
    .then((info) => {
      if (info.accepted.includes(Email)) {
        console.log(`Email successfully sent to ${Email}`);
      } else {
        console.log(`Failed to send email to ${Email}`);
      }
    })
    .catch((error) => {
      console.error(`Error sending email to ${Email}:`, error);
    });
};

const PayslipGenerator = async () => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Check if Payslip records already exist for the current month
    const existingPayslips = await Payslip.findAll({
      where: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1, // Months are zero-based in JavaScript Date
      },
    });

    // If there are no existing Payslip records, duplicate records for the previous month
    if (existingPayslips.length === 0) {
      // Calculate the previous month and year
      const previousMonth =
        currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const previousYear =
        currentDate.getMonth() === 0
          ? currentDate.getFullYear() - 1
          : currentDate.getFullYear();

      // Find Payslip records for the previous month
      const previousMonthPayslips = await Payslip.findAll({
        where: {
          year: previousYear,
          month: previousMonth + 1, // Months are zero-based in JavaScript Date
        },
      });

      // Duplicate Payslip records for the current month
      const currentMonthPayslips = previousMonthPayslips.map((payslip) => ({
        ...payslip.toJSON(),
        id: null, // Set id to null to create a new record
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1, // Months are zero-based in JavaScript Date
      }));

      // Create new records for the current month
      await Payslip.bulkCreate(currentMonthPayslips);

      console.log('Payslip records duplicated successfully!');
    } else {
      console.log('Payslip records already exist for the current month.');
    }
  } catch (error) {
    console.error('Error duplicating Payslip records:', error);
  }
};

const ProbationChecker = async () => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date 6 months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    // Find employees with isProbation equal to 0 and joiningDate less than six months ago

    const employeesToUpdate = await Employee.findAll({
      where: {
        isProbation: 0,
        // Convert VARCHAR date to JavaScript Date object for comparison
        joiningDate: {
          [Op.and]: [
            sequelize.literal(
              `STR_TO_DATE(joiningDate, '%d/%m/%Y') <= '${
                sixMonthsAgo.toISOString().split('T')[0]
              }'`
            ),
            sequelize.literal(
              `STR_TO_DATE(joiningDate, '%d/%m/%Y') < '${
                currentDate.toISOString().split('T')[0]
              }'`
            ),
          ],
        },
      },
    });

    const updatedEmployees = await Employee.update(
      { isProbation: 1 },
      {
        where: {
          isProbation: 0,
          // Convert VARCHAR date to JavaScript Date object for comparison
          joiningDate: {
            [Op.and]: [
              sequelize.literal(
                `STR_TO_DATE(joiningDate, '%d/%m/%Y') <= '${
                  sixMonthsAgo.toISOString().split('T')[0]
                }'`
              ),
              sequelize.literal(
                `STR_TO_DATE(joiningDate, '%d/%m/%Y') < '${
                  currentDate.toISOString().split('T')[0]
                }'`
              ),
            ],
          },
        },
      }
    );

    console.log(
      `${updatedEmployees} employee(s) completed their probation period today and their status from probation to permenant employee is updated.`
    );
    if (updatedEmployees) {
      for (let employee of employeesToUpdate) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.hostinger.com', // Use the Yandex service
          port: 465,
          auth: {
            user: process.env.MAIL_USER, // Your Yandex email address
            pass: process.env.MAIL_PASS, // Your Yandex email password
          },
        });

        transporter
          .sendMail({
            from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
            to: employee.email,
            subject: 'Congrats! on Your New Achievement🚀',
            html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Birthday Wishes</title>
  </head>

  <body style="">
    <div
      class="container"
      style="
        min-height: 90vh;
        border-radius: 10px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          sans-serif;
        max-width: 610px;
        margin: 1vh auto;

        color: #000;
        padding: 10px;
      "
    >
      <section
        style="
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          border-radius: 10px;
        "
      >
        <div id="logo" style="display: flex; justify-content: end">
          <img
            src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
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
        <h1 style="color: rgb(47, 179, 37); padding: 10px; text-align: center">
          <span style="font-size: 30px"> Congratulations!</span> <br /><span
            style="color: #000; font-size: 20px"
            >On your probation period is completed today</span
          >
        </h1>

        <p style="text-align: justify; padding: 5px 25px">
          Dear
          <span style="color: blue; font-weight: bold">${employee.NAME}</span>,
          <br />
          <br />
          We are pleased to inform you that your probation period has been
          successfully completed. Congratulations on reaching this important
          milestone! During your probation, you have demonstrated outstanding
          performance and dedication to your responsibilities.
          <br />
          We appreciate your hard work and commitment to our team. As a
          permanent member of our organization, we look forward to continued
          success and collaboration with you. If you have any questions or
          require further information, feel free to reach out..
        </p>
        <p style="text-align: justify; padding: 10px 25px">
          Best Regards <br />
          <span style="color: green; font-weight: 700"> HR-Taypro</span>
        </p>
      </section>
    </div>
  </body>
</html>

`,
          })
          .then((info) => {
            if (info.envelope.to.includes(employee.email)) {
              console.log(
                `Probation email successfully sent to ${employee.email}`
              );
            } else {
              console.log(
                `Failed to send Probation email to ${employee.email}`
              );
            }
          })
          .catch((error) => {
            console.error(`Error sending email to ${employee.email}:`, error);
          });
      }
    }
  } catch (error) {
    console.error('Error updating employee probation status:', error);
  }
};

// const processLeavesAndCreateRefidChecks = async () => {
//   try {
//     // Fetch all leaves from Leaves table
//     const allLeaves = await Leaves.findAll({
//       where: {
//         approved: 1,
//       },
//     });

//     console.log(`leave found :${allLeaves.length}`);

//     // Iterate through each leave and create RefidChecks if conditions are met
//     for (const leaveInstance of allLeaves) {
//       const leave = leaveInstance.get(); // Convert Sequelize instance to plain JavaScript object
//       console.log('Processing leave:', leave.id);

// const currentDate = new Date();

// const currentYear = currentDate.getFullYear();
// const currentMonth = currentDate.getMonth() + 1;
// const currentDay = currentDate.getDate();
// const InTime = '09:00:00';
// const OutTime = '18:00:00';

// const DefaultInLattitude = '18.6483599';
// const DefaultInLongitude = '73.8313038';

// const DefaultOutLattitude = '18.6483599';
// const DefaultOutLongitude = '73.8313038';

//       const expectedDateOfLeave = new Date(leave.expectedDateOfLeave);
//       const startDate = expectedDateOfLeave.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//       });

//       const expectedDateOfreturn = new Date(leave.expectedDateOfreturn);

//       const EndDate = expectedDateOfreturn.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//       });

//       // if (leave) {
//       const employee = await Employee.findOne({
//         where: {
//           employee_id: leave.employee_id,
//         },
//       });

//       if (
//         currentDate >= expectedDateOfLeave &&
//         currentDate <= expectedDateOfreturn
//       ) {
//         // Create a record in RefidChecks table
//         const RfidCkeck = await RfidCkeck.create({
// IN_TIME_1: `${currentYear}-${currentMonth}-${currentDay} ${InTime}`,
// OUT_TIME_1: `${currentYear}-${currentMonth}-${currentDay} ${OutTime}`,
// totalHours: 8,
// isLeave: 1,
// LeaveType: leave.type,
// Name: leave.name,
// employee_id: leave.employee_id,
// UID: employee.UID,
// IN_LATTITUDE_1: DefaultInLattitude,
// IN_LONGITUDE_1: DefaultInLongitude,
// OUT_LATTITUDE_1: DefaultOutLattitude,
// OUT_LONGITUDE_1: DefaultOutLongitude,
// year: currentYear,
// month: currentMonth,
// day: currentDay,
//         });

//         // console.log('Creating RefidCheck:', RfidCkeck);

//         const leaveRecord = await RfidCkeck.save();
//         if (!leaveRecord) {
//           console.error(
//             'Failed to create RefidCheck. Validation errors:',
//             RfidCkeck.errors
//           );
//         } else {
//           console.log('Leave record created successfully:');
//         }
//         console.log('Leave record created:');
//       } else {
//         console.log('Did not found');
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching or processing leaves:', error);
//   }
// };

const processLeavesAndCreateRefidChecks = async () => {
  try {
    // Fetch all leaves from Leaves table
    const allLeaves = await Leaves.findAll({
      where: {
        approved: 1,
      },
    });

    console.log(`Leaves found: ${allLeaves.length}`);

    // Iterate through each leave and create RefidChecks if conditions are met
    for (const leaveInstance of allLeaves) {
      const leave = leaveInstance.get(); // Convert Sequelize instance to plain JavaScript object
      // console.log('Processing leave:', leave.id);

      const currentDate = new Date();
      // console.log('Current date:', currentDate);

      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      const InTime = '09:00:00';
      const OutTime = '18:00:00';

      const DefaultInLattitude = '18.6483599';
      const DefaultInLongitude = '73.8313038';

      const DefaultOutLattitude = '18.6483599';
      const DefaultOutLongitude = '73.8313038';

      const expectedDateOfLeave = new Date(leave.expectedDateOfLeave);
      const expectedDateOfreturn = new Date(leave.expectedDateOfreturn);

      // console.log('Expected Date of Leave:', expectedDateOfLeave);
      // console.log('Expected Date of Return:', expectedDateOfreturn);

      // Set the time component of expectedDateOfreturn to the end of the day
      expectedDateOfreturn.setHours(23, 59, 59, 999);

      // console.log('Modified Expected Date of Return:', expectedDateOfreturn);

      const startDate = expectedDateOfLeave.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const endDate = expectedDateOfreturn.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      // if (leave) {
      const employee = await Employee.findOne({
        where: {
          employee_id: leave.employee_id,
          isProbation: 1,
        },
      });
      if (!employee) {
        return console.log(
          'Employee is on probation period so their leave is not valid to add'
        );
      }
      if (
        currentDate >= expectedDateOfLeave &&
        currentDate <= expectedDateOfreturn
      ) {
        // Create a record in RefidChecks table
        const rfidCheck = await RfidCkeck.create({
          IN_TIME_1: `${currentYear}-${currentMonth}-${currentDay} ${InTime}`,
          OUT_TIME_1: `${currentYear}-${currentMonth}-${currentDay} ${OutTime}`,
          totalHours: 8,
          isLeave: 1,
          LeaveType: leave.type,
          Name: leave.name,
          employee_id: leave.employee_id,
          UID: employee.UID,
          IN_LATTITUDE_1: DefaultInLattitude,
          IN_LONGITUDE_1: DefaultInLongitude,
          OUT_LATTITUDE_1: DefaultOutLattitude,
          OUT_LONGITUDE_1: DefaultOutLongitude,
          year: currentYear,
          month: currentMonth,
          day: currentDay,
        });

        const leaveRecord = await rfidCheck.save();
        if (!leaveRecord) {
          console.error(
            'Failed to create RefidCheck. Validation errors:',
            rfidCheck.errors
          );
        } else {
          console.log('Leave record created successfully:');
        }
      } else {
        console.log('Did not find a leave for the current date.');
      }
    }
  } catch (error) {
    console.error('Error fetching or processing leaves:', error);
  }
};

const HolidayGenerator = async () => {
  try {
    // Get the current date
    const currentDate = new Date();

    const existingHolidays = await Holidays.findOne({
      where: sequelize.literal(`DATE(date) = CURDATE()`),
    });

    // console.log(
    //   existingHolidays  ? ` holiday found ` : `holiday not fouund`
    // );
    // console.log('current Day ' + currentDate.getDate());
    // console.log('current Month ' + (currentDate.getMonth() + 1));
    // console.log('current Year ' + currentDate.getFullYear());

    // If there are no existing holidays, create new records for the current month
    if (existingHolidays) {
      // Fetch all employees from the Employees table
      const employees = await Employee.findAll();

      // Create records in RfidCkecks table for each employee
      const rfidCheckRecords = employees.map((employee) => {
        return {
          UID: employee.UID, // Assuming UID is a field in the Employees table
          Name: employee.NAME,
          employee_id: employee.employee_id, // Assuming id is the primary key of the Employees table
          IN_LATTITUDE_1: '18.6483599',
          IN_LONGITUDE_1: '73.8313038',
          IN_TIME_1: `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getDate()} 09:00:00`,
          OUT_LATTITUDE_1: '18.6483599',
          OUT_LONGITUDE_1: '73.8313038',
          OUT_TIME_1: `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getDate()} 18:00:00`,
          // Other fields as per your data model
          LeaveType: 'PH', // Set LeaveType to 'PH'
          isLeave: '0', // Set isLeave to '0'
          totalHours: '540',
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1, // Months are zero-based, so add 1
          day: currentDate.getDate(),
          // Set other fields as per your requirements
        };
      });

      // Create records in RfidCkecks table
      await RfidCkeck.bulkCreate(rfidCheckRecords);
      console.log(`Successfully created records for paid holiday today`);
    } else {
      console.log(`No holiday found today`);
    }
  } catch (error) {
    console.error('Error in HolidayGenerator:', error);
  }
};

const calculateTotalHoursForToday = async () => {
  try {
    // Get today's date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const day = currentDate.getDate();

    // Find all records for the current day
    const records = await RfidCkeck.findAll({
      where: {
        year,
        month,
        day,
      },
    });

    for (const record of records) {
      let tap1 = new Date(record.OUT_TIME_1) - new Date(record.IN_TIME_1);
      let tap2 = 0;
      let tap3 = 0;

      if (record.IN_TIME_2) {
        tap2 = new Date(record.OUT_TIME_2) - new Date(record.IN_TIME_2);
      }

      if (record.IN_TIME_3) {
        tap3 = new Date(record.OUT_TIME_3) - new Date(record.IN_TIME_3);
      }

      const totalHTap1 = tap1 / (1000 * 60 * 60);
      const totalHTap2 = tap2 / (1000 * 60 * 60);
      const totalHTap3 = tap3 / (1000 * 60 * 60);

      const totalH = totalHTap1 + totalHTap2 + totalHTap3;
      const totalM = Math.floor((totalH % 1) * 60);
      const totalHour = Math.floor(totalH);
      // const totalHours = parseFloat(`${Math.floor(totalH)}.${totalM}`).toFixed(2);

      let totalTime = `${totalHour}.${totalM}`;
      const totalHours = (record.totalHours = totalTime);
      await record.update({ totalHours });
    }

    console.log(
      `Total hours calculation completed for the current day ,for total ${records.length} employees`
    );
  } catch (error) {
    console.error('Error calculating total hours:', error);
  }
};

// const WomensDay=async()={

//   <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>International Women's Day Celebration</title>
//     <style></style>
//   </head>
//   <body
//     style="
//       font-family: Arial, sans-serif;
//       background-color: #f4f4f4;
//       margin: 0;
//       padding: 0;
//     "
//   >
//     <div
//       class="container"
//       style="
//         max-width: 600px;
//         margin: 20px auto;
//         padding: 20px;
//         background-color: #fff;
//         border-radius: 8px;
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//       "
//     >
//       <div style="text-align: center; color: #333">
//         <h1 style="font-weight: 600">International Women's Day</h1>
//       </div>
//       <br />
//       <div style="margin-top: 20px; line-height: 1.6; color: #000000">
//         <p>Dear <b>Prajakta R</b>,</p>
//         <p>Happy International Women's Day!</p>
//         <p>
//           On this special occasion, we would like to take a moment to honor and
//           appreciate the incredible contributions of our female team members.
//           Your hard work, dedication, and unique perspectives play a crucial
//           role in making our organization successful and diverse.
//         </p>
//         <!-- Add more content as needed -->

//         <p>
//           Thank you for being an integral part of our organization. Your
//           commitment and dedication inspire us all. Happy International Women's
//           Day!
//         </p>
//         <p style="font-weight: 600">
//           Best regards,<br />Taypro Private Limited. <br />
//           <span style="color: green">We make green energy greener!</span>
//         </p>
//       </div>
//       <div style="width: 40%; margin: auto">
//         <img
//           src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
//           alt="logo"
//           style="width: 200px; height: 50px; object-fit: contain"
//         />
//       </div>
//       <div style="margin-top: 20px; text-align: center; color: #777">
//         <p>&copy;2024 | Taypro Private Limited | All rights reserved.</p>
//       </div>
//     </div>
//   </body>
// </html>

// }

const sendWomensDayEmail = async () => {
  try {
    const womensEmployees = await Employee.findAll({
      where: { gender: 'female' },
    });

    console.log(`Found ${womensEmployees.length} women employees found.`);

    for (let womenemployee of womensEmployees) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Use the Yandex service
        port: 465,
        auth: {
          user: process.env.MAIL_USER, // Your Yandex email address
          pass: process.env.MAIL_PASS, // Your Yandex email password
        },
      });

      transporter
        .sendMail({
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: womenemployee.email,
          subject: 'Happy International Womens Day!',
          //           html: `
          //           <!DOCTYPE html>
          //           <html lang="en">

          //           <head>
          //               <meta charset="UTF-8" />
          //               <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          //               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          //               <title>International Women's Day Celebration</title>
          //               <style>
          //                   body {
          //                       font-family: Arial, sans-serif;
          //                       background-color: #f4f4f4;
          //                       margin: 0;
          //                       padding: 0;
          //                   }

          //                   .container {
          //                       max-width: 600px;
          //                       margin: 20px auto;
          //                       padding: 20px;
          //                       background-color: #fff;
          //                       border-radius: 8px;
          //                       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          //                   }

          //                   h1 {
          //                       text-align: center;
          //                       color: #333;
          //                       font-weight: 600;
          //                   }

          //                   .content {
          //                       margin-top: 20px;
          //                       line-height: 1.6;
          //                       color: #000000;
          //                   }

          //                   .content p {
          //                       margin-bottom: 15px;
          //                   }

          //                   .logo {
          //                       width: 40%;
          //                       margin: auto;
          //                       text-align: center;
          //                   }

          //                   .logo img {
          //                       width: 100%;
          //                       max-width: 200px;
          //                       height: auto;
          //                       object-fit: contain;
          //                   }

          //                   .footer {
          //                       margin-top: 20px;
          //                       text-align: center;
          //                       color: #777;
          //                   }
          //               </style>
          //           </head>

          //           <body>
          //               <div class="container">
          //                   <h1>International Women's Day</h1>

          //                   <div class="content">
          //                       <p>Dear <b>${womenemployee.NAME}</b>,</p>
          //                       <p>Happy International Women's Day!</p>
          //                       <p>
          //                           On this special occasion, we would like to take a moment to honor and appreciate the incredible
          //                           contributions of our female team members. Your hard work, dedication, and unique perspectives play
          //                           a crucial role in making our organization successful and diverse.
          //                       </p>
          //                       <p>
          //                           Thank you for being an integral part of our organization. Your commitment and dedication inspire us
          //                           all. Happy International Women's Day!
          //                       </p>
          //                       <p style="font-weight: 600">
          //                           Best regards,<br />Taypro Private Limited. <br />
          //                           <span style="color: green">We make green energy greener!</span>
          //                       </p>
          //                   </div>

          //                   <div class="logo">
          //                       <img src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png" alt="logo" />
          //                   </div>

          //                   <div class="footer">
          //                       <p>&copy;2024 | Taypro Private Limited | All rights reserved.</p>
          //                   </div>
          //               </div>
          //           </body>

          //           </html>

          // `,

          html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>International Women's Day Celebration</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  box-shadow: #000000;
                }
          
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
          
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
          
                h1 {
                  text-align: center;
                  color: #333;
                  font-weight: 600;
                }
          
                .content {
                  margin-top: 20px;
                  line-height: 1.6;
                  color: #000000;
                }
          
                .content p {
                  margin-bottom: 15px;
                }
          
                .logo {
                  width: 40%;
                  margin: auto;
                  text-align: center;
                }
          
                .logo img {
                  /* width: 100%;
                  max-width: 200px; */
                  /* height: auto; */
                  object-fit: contain;
                }
          
                .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #000000;
                }
              </style>
            </head>
          
            <body>
              <div class="container">
                <h1>International Women's Day</h1>
          
                <div class="content">
                  <p>Dear <b>${womenemployee.NAME}</b>,</p>
                  <p>Happy International Women's Day!</p>
                  <p>
                    On this special occasion, we would like to take a moment to honor and
                    appreciate the incredible contributions of our female team members.
                    Your hard work, dedication, and unique perspectives play a crucial
                    role in making our organization successful and diverse.
                  </p>
                  <p>
                    Thank you for being an integral part of our organization. Your
                    commitment and dedication inspire us all. Happy International Women's
                    Day!
                  </p>
                  <p style="font-weight: 600">
                    Best regards,<br />Taypro Private Limited. <br />
                    <span style="color: green">We make green energy greener!</span>
                  </p>
                </div>
          
                <div class="logo">
                  <img
                    src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
                    alt="logo"
                    height="80"
                    width="200"
                  />
                </div>
          
                <div class="footer">
                  <p>&copy;2024 | Taypro Private Limited | All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
          

`,
        })
        .then((info) => {
          if (info.envelope.to.includes(womenemployee.email)) {
            console.log(
              `Womens day Email sent to ${womenemployee.NAME} (${womenemployee.email})`
            );
          } else {
            console.log(
              `Failed to send Womens day Email to ${womenemployee.email}`
            );
          }
        })
        .catch((error) => {
          console.error(
            `Error sending email to ${womenemployee.email}:`,
            error
          );
        });
    }
  } catch (error) {
    console.error('Error sending Womens Day emails:', error);
  }
};

const sendWomensEmail = async () => {
  // try {
  // const womensEmployees = await Employee.findAll({
  //   where: { gender: 'female' },
  // });

  // console.log(`Found ${womensEmployees.length} women employees found.`);

  // for (let womenemployee of womensEmployees) {
  const NAME = 'Pooja Deshmane';
  const email = 'pooja.deshmane@taypro.in';
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Use the Yandex service
    port: 465,
    auth: {
      user: process.env.MAIL_USER, // Your Yandex email address
      pass: process.env.MAIL_PASS, // Your Yandex email password
    },
  });

  transporter
    .sendMail({
      from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Happy International Womens Day!',

      html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>International Women's Day Celebration</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  box-shadow: #000000;
                }
          
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
          
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
          
                h1 {
                  text-align: center;
                  color: #333;
                  font-weight: 600;
                }
          
                .content {
                  margin-top: 20px;
                  line-height: 1.6;
                  color: #000000;
                }
          
                .content p {
                  margin-bottom: 15px;
                }
          
                .logo {
                  width: 40%;
                  margin: auto;
                  text-align: center;
                }
          
                .logo img {
                  /* width: 100%;
                  max-width: 200px; */
                  /* height: auto; */
                  object-fit: contain;
                }
          
                .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #000000;
                }
              </style>
            </head>
          
            <body>
              <div class="container">
                <h1>International Women's Day</h1>
          
                <div class="content">
                  <p>Dear <b>${NAME}</b>,</p>
                  <p>Happy International Women's Day!</p>
                  <p>
                    On this special occasion, we would like to take a moment to honor and
                    appreciate the incredible contributions of our female team members.
                    Your hard work, dedication, and unique perspectives play a crucial
                    role in making our organization successful and diverse.
                  </p>
                  <p>
                    Thank you for being an integral part of our organization. Your
                    commitment and dedication inspire us all. Happy International Women's
                    Day!
                  </p>
                  <p style="font-weight: 600">
                    Best regards,<br />Taypro Private Limited. <br />
                    <span style="color: green">We make green energy greener!</span>
                  </p>
                </div>
          
                <div class="logo">
                  <img
                    src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
                    alt="logo"
                    height="80"
                    width="200"
                  />
                </div>
          
                <div class="footer">
                  <p>&copy;2024 | Taypro Private Limited | All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
          

`,
    })
    .then((info) => {
      if (info.envelope.to.includes(email)) {
        console.log(`Womens day Email sent to ${NAME} (${email})`);
      } else {
        console.log(`Failed to send Womens day Email to ${email}`);
      }
    })
    .catch((error) => {
      console.error(`Error sending email to ${email}:`, error);
    });
  //   }
  // } catch (error) {
  //   console.error('Error sending Womens Day emails:', error);
  // }
};

const createSundayAttendance = async (startDate, endDate) => {
  try {
    // Fetch all active employees
    const activeEmployees = await Employee.findAll({
      where: {
        activate: 1, // Assuming isActive field denotes active employees
      },
    });

    // Iterate through each active employee
    for (const employee of activeEmployees) {
      const employeeData = employee.get(); // Convert Sequelize instance to plain JavaScript object

      // Get all Sundays between start and end dates
      const sundays = [];
      const currentDate = new Date(startDate);
      const end = new Date(endDate);
      while (currentDate <= end) {
        if (currentDate.getDay() === 0) {
          sundays.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Process each Sunday
      for (const sunday of sundays) {
        const currentYear = sunday.getFullYear();
        const currentMonth = sunday.getMonth() + 1;
        const currentDay = sunday.getDate();
        const InTime = '09:00:00';
        const OutTime = '18:00:00';

        // Create a record in RefidChecks table
        const rfidCheck = await RfidCkeck.create({
          IN_TIME_1: `${currentYear}-${currentMonth}-${currentDay} ${InTime}`,
          OUT_TIME_1: `${currentYear}-${currentMonth}-${currentDay} ${OutTime}`,
          totalHours: 8,
          isLeave: 0, // Not a leave day
          employee_id: employeeData.employee_id,
          UID: employeeData.UID,
          IN_LATTITUDE_1: employeeData.IN_LATTITUDE_1,
          IN_LONGITUDE_1: employeeData.IN_LONGITUDE_1,
          OUT_LATTITUDE_1: employeeData.OUT_LATTITUDE_1,
          OUT_LONGITUDE_1: employeeData.OUT_LONGITUDE_1,
          year: currentYear,
          month: currentMonth,
          day: currentDay,
        });

        const attendanceRecord = await rfidCheck.save();
        if (!attendanceRecord) {
          console.error(
            'Failed to create attendance record for Sunday. Validation errors:',
            RfidCkeck.errors
          );
        } else {
          console.log('Attendance record for Sunday created successfully.');
        }
      }
    }
  } catch (error) {
    console.error('Error creating Sunday attendance:', error);
  }
};

export {
  sendBirthdayEmails,
  checkAndCreateBirthdayRecords,
  AnniversaryEmails,
  Intern,
  PayslipGenerator,
  ProbationChecker,
  processLeavesAndCreateRefidChecks, // Call the HolidayGenerator function
  HolidayGenerator,
  calculateTotalHoursForToday,
  sendWomensDayEmail,
  sendWomensEmail,
  createSundayAttendance,
};
