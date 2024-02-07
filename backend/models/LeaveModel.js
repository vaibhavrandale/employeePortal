import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Leaves = sequelize.define(
  'Leaves',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    other: {
      type: DataTypes.STRING,
    },
    expectedDateOfLeave: {
      type: DataTypes.DATE,
    },
    expectedDateOfreturn: {
      type: DataTypes.DATE,
    },
    reasonInDetail: {
      type: DataTypes.STRING,
    },
    mobileNo: {
      type: DataTypes.STRING,
    },
    approved: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    approvedBy: {
      type: DataTypes.STRING,
    },
    remark: {
      type: DataTypes.STRING,
    },
    approvedAt: {
      type: DataTypes.STRING,
    },
    remarkBy: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Leaves;
