import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Policy = sequelize.define('Policy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
  },

  link: {
    type: DataTypes.STRING,
  },
});

export default Policy;
