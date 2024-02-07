// import mongoose from 'mongoose';

// const birthdayWishSchema = new mongoose.Schema({
//   birthday_boy: {
//     type: String,
//     required: true,
//   },
//   birthday_date: {
//     type: String,
//     required: true,
//   },
//   birthday_boy_email: {
//     type: String,
//     required: true,
//   },
//   birthday_boy_employee_id: {
//     type: String,
//     required: true,
//   },
//   birthday_boy_image: {
//     type: String,
//     required: true,
//   },
//   wishes: [
//     {
//       wishername: {
//         type: String,
//         required: true,
//       },
//       wisher_employee_id: {
//         type: String,
//         required: true,
//       },
//       wisher_email: {
//         type: String,
//         required: true,
//       },
//       wisher_image: {
//         type: String,
//       },
//       wish: {
//         type: String,
//         required: true,
//       },
//       reply: {
//         type: String,
//       },
//     },
//   ],
// });

// const BirthdayWish = mongoose.model('BirthdayWish', birthdayWishSchema);

// export default BirthdayWish;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance

// Define the BirthdayWish model
const BirthdayWish = sequelize.define('BirthdayWish', {
  birthday_boy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday_boy_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday_boy_employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday_boy_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default BirthdayWish;
