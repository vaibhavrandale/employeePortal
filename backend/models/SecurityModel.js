import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance
// UID, NAME, Reg_no, email, Contact_No
const Security = sequelize.define('Security', {
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
  current_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  prevoius_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updatedBy: {
    type: DataTypes.STRING,
  },
});
export default Security;
