import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Access = sequelize.define('Access', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.INTEGER,
  },
});

export default Access;
