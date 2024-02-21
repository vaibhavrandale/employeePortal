import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const pdf = sequelize.define('pdf', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  filename: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
});

export default pdf;
