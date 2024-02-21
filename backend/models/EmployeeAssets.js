import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EmployeeAssets = sequelize.define('EmployeeAssets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
  },
  employee_id: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  given_date: {
    type: DataTypes.STRING,
  },
  return_date: {
    type: DataTypes.STRING,
  },
  imageA: {
    type: DataTypes.STRING,
  },
  imageB: {
    type: DataTypes.STRING,
  },
  remark: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.INTEGER,
  },
});

export default EmployeeAssets;
