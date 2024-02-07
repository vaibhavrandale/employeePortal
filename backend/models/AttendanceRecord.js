import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance

const AttendanceRecord = sequelize.define(
  'AttendanceRecord',
  {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginTime: {
      type: DataTypes.DATE,
    },
    logoutTime: {
      type: DataTypes.DATE,
    },
    totalHours: {
      type: DataTypes.FLOAT, // Assuming totalHours can be a decimal value
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isLeave: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    LeaveType: {
      type: DataTypes.STRING, // Change the data type based on your leave types
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable sequelize's default timestamp fields
  }
);

export default AttendanceRecord;
