import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance
// UID, NAME, Reg_no, email, Contact_No
const RfidReg = sequelize.define(
  'RfidReg',
  {
    UID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Reg_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    Contact_No: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false, // Disable sequelize's default timestamp fields
  }
);
export default RfidReg;
