import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const JobOpening = sequelize.define('JobOpening', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  JobID: {
    type: DataTypes.STRING,
    unique: true,
  },
  JobDescription: {
    type: DataTypes.STRING,
  },
  EndDate: {
    type: DataTypes.STRING,
  },
  submittedBy: {
    type: DataTypes.STRING,
  },
  submittedAt: {
    type: DataTypes.STRING,
  },
});

export default JobOpening;
