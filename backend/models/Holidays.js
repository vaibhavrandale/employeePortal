import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Holidays = sequelize.define('Holidays', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  // description: {
  //   type: DataTypes.STRING,
  // },
});

export default Holidays;
