import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Investment = sequelize.define('Investment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  employee_id: {
    type: DataTypes.STRING,
  },
  A_80C: {
    type: DataTypes.STRING,
  },
  A_80CC: {
    type: DataTypes.STRING,
  },
  B_80CCC: {
    type: DataTypes.STRING,
  },

  C_80CCD_1: {
    type: DataTypes.STRING,
  },
  D_80CCE: {
    type: DataTypes.STRING,
  },
  Regime: {
    type: DataTypes.STRING,
  },
  F_80CCD_2: {
    type: DataTypes.STRING,
  },
  submittedBy: {
    type: DataTypes.STRING,
  },
  submittedAt: {
    type: DataTypes.STRING,
  },
});

export default Investment;
