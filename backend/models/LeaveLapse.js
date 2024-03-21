import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance
// UID, NAME, Reg_no, email, Contact_No
const LeaveLapse = sequelize.define('LeaveLapse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  Name: {
    type: DataTypes.STRING,
  },

  employee_id: {
    type: DataTypes.STRING,
  },
  leaves: {
    type: DataTypes.STRING,
  },

  sick: {
    type: DataTypes.STRING,
  },

  privilege: {
    type: DataTypes.STRING,
  },
  casual: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.STRING,
  },

  isLapsed: {
    type: DataTypes.NUMBER,
  },
  LeavetypeLapsed: {
    type: DataTypes.STRING,
  },
  NoofleaveLapsed: {
    type: DataTypes.STRING,
  },
});
export default LeaveLapse;
