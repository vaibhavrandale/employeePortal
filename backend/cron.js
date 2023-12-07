import Employee from './models/employeeModel.js';
import BirthdayWish from './models/BirthdayWish.js';

import nodemailer from 'nodemailer';
const birthday =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693764320/sp5vtxeqnqz4eb7n3gx7.jpg';
const logo =
  'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';
const sendBirthdayEmails = async () => {
  try {
    const currentDate = new Date();

    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    const birthdayEmployees = await Employee.find();

    const todaysBirthdayEmployees = birthdayEmployees.filter((employee) => {
      const [day, month] = employee.birth_date.split('/'); // Ignore the year
      return day === currentDay && month === currentMonth;
    });

    console.log(
      `Found ${todaysBirthdayEmployees.length} employees with birthdays today.`
    );

    for (let employee of todaysBirthdayEmployees) {
      const transporter = nodemailer.createTransport({
        service: 'Hostinger',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      transporter
        .sendMail({
          from: `TAYPRO INTERNAL <${process.env.MAIL_USER}>`,
          to: employee.email,
          subject: 'Happy Birthday🥂🎂',
          html: ` <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Birthday Wish</title>
              <style>
                  @keyframes slideIn {
                      0% {
                          transform: translateY(-100%);
                      }
                      100% {
                          transform: translateY(0);
                      }
                  }
          
                  @keyframes fadeIn {
                      0% {
                          opacity: 0;
                      }
                      100% {
                          opacity: 1;
                      }
                  }
          
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f7f9fc;
                      padding: 20px;
                     
                  }
          
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      border-radius: 8px;
                      overflow: hidden;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      animation: slideIn 1s ease-out, fadeIn 1.5s ease-out;
                      border:1px solid #ff004f;
                  }
          
                  .header {
                      background-color: #ff004f;
                      color: #ffffff;
                      padding: 20px;
                      text-align: center;
                      font-size: 24px;
                  }
          
                  .content {
                      padding: 20px;
                  }
          
                  .birthday-message {
                      text-align: center;
                      font-size: 18px;
                      margin-bottom: 20px;
                  }
                  @keyframes flagWave {
                    0% {
                      transform: translateY(0px) skewX(20deg);
                  }
                  50% {
                      transform: translateY(5px) skewX(-20deg);
                  }
                  100% {
                      transform: translateY(0px) skewX(20deg);
                  }
                }
          
                  .birthday-image {
                      display: block;
                      width: 100%;
                      max-width: 300px;
                      margin: 0 auto;
                      animation: flagWave 0.5s infinite alternate;
                  }
                 
                  #name{
                    color:#ff004f;
                    font-weight:600;
                  }
                  #footer{
                    padding: 20px;
                  }
                  #logoImage{
                    display: block;
                    margin: 0 auto;
                    width: 100px;
                    height: 50px;
                    object-fit: contain;
                   
                  }
                  #logoContainer{
                   display:flex;
                   justify-content:end;
                   align-items:end;
                  }
              </style>
          </head>
          <body>
         
              <div class="container">
             
                  <div class="header">
                    Happy Birthday!
                  </div>
                  <div class="content">
                  <div id="logoContainer">
                  <img src=${logo} id="logoImage"  alt="Embedded Image" /></div>
                      <p class="birthday-message">Hii <b id="name">${employee.name}</b>, Wishing you a day filled with happiness and a year filled with joy.</p>
                      <p class="birthday-message">May your special day be full of smiles, laughter, and love!</p>
                      <img src=${birthday} alt="Birthday Celebration" class="birthday-image">
                        </div>
                       <div id="footer">
                       <br/>
                       <span>Best Regards,</span><br/>
                      
                       <span>TAYPRO Family</span><br/>
                    <span><b>We make green energy greener!!</b></span><br/>
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

const checkAndCreateBirthdayRecords = async () => {
  // cron.schedule('* * * * *', async () => {
  try {
    const currentDate = new Date();
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    const birthdayEmployees = await Employee.find();

    const todaysBirthdayEmployees = birthdayEmployees.filter((employee) => {
      const [day, month] = employee.birth_date.split('/'); // Ignore the year
      return day === currentDay && month === currentMonth;
    });

    // Check if there are employees with birthdays today
    if (todaysBirthdayEmployees.length > 0) {
      // Create records for each birthday boy with an empty array of wishes
      const birthdayRecords = todaysBirthdayEmployees.map((employee) => ({
        birthday_boy: `${employee.name}`,
        birthday_date: `${employee.birth_date}`,
        birthday_boy_email: employee.email,
        birthday_boy_employee_id: employee.employee_id,
        birthday_boy_image: employee.image,
        wishes: [],
      }));

      // Insert the records into the BirthdayWish collection
      await BirthdayWish.insertMany(birthdayRecords);

      console.log(`Birthday records created.`);
    } else {
      console.log('No birthdays today.');
    }
  } catch (error) {
    console.error('Error checking and creating birthday records:', error);
  }
};

export { sendBirthdayEmails, checkAndCreateBirthdayRecords };
