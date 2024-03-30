import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const JobReferal = sequelize.define('JobReferal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  JobID: {
    type: DataTypes.STRING,
    unique: true,
  },
  refer_employee_name: {
    type: DataTypes.STRING,
  },
  refer_employee_mobileno: {
    type: DataTypes.STRING,
  },
  refer_employee_email: {
    type: DataTypes.STRING,
  },
  refer_employee_adhaar_no: {
    type: DataTypes.STRING,
  },
  refer_employee_resume: {
    type: DataTypes.STRING,
  },
  profile_screened: {
    type: DataTypes.STRING,
  },
  profile_screenedBy: {
    type: DataTypes.STRING,
  },
  interview_scheduled: {
    type: DataTypes.STRING,
  },
  interview_completed: {
    type: DataTypes.STRING,
  },
  refer_employee_joined: {
    type: DataTypes.STRING,
  },
  refer_by_employee_name: {
    type: DataTypes.STRING,
  },
  refer_by_employee_email: {
    type: DataTypes.STRING,
  },
  refer_by_employee_employee_id: {
    type: DataTypes.STRING,
  },
});

export default JobReferal;
