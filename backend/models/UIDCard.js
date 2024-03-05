import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance
// UID, NAME, Reg_no, email, Contact_No
const UIDCard = sequelize.define('UIDCard', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  current_uid: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  prevoius_uid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updatedBy: {
    type: DataTypes.STRING,
  },
});
export default UIDCard;
