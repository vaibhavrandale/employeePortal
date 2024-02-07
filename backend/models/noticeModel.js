// import mongoose from 'mongoose';

// const noticeSchema = new mongoose.Schema(
//   {
//     img: { type: String },
//     title: { type: String },
//     date: { type: String },
//     subject: { type: String },
//     description: { type: String },
//     highlightPoints: [],
//     noticeBy: { type: String },
//     seal: { type: String },
//     mobile_no: { type: String },
//     attachments: [
//       {
//         url: { type: String, required: true },
//         label: { type: String, required: true },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );
// const Notice = mongoose.model('Notice', noticeSchema);

// export default Notice;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance

const Notice = sequelize.define(
  'Notice',
  {
    img: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    highlightPoints: {
      type: DataTypes.JSON, // Change data type to JSON
      defaultValue: [], // Set default value to an empty array
    },
    noticeBy: {
      type: DataTypes.STRING,
    },
    seal: {
      type: DataTypes.STRING,
    },
    mobile_no: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Notice;
