import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance
// UID, NAME, Reg_no, email, Contact_No
const RaiseInvoice = sequelize.define('RaiseInvoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  client_name: {
    type: DataTypes.STRING,
  },

  purchase_order_no: {
    type: DataTypes.STRING,
    unique: true, // Enforce uniqueness
  },

  purchase_order_date: {
    type: DataTypes.STRING,
  },

  PO_value: {
    type: DataTypes.STRING,
  },

  invoice_number: {
    type: DataTypes.STRING,
    unique: true, // Enforce uniqueness
  },
  invoice_value: {
    type: DataTypes.STRING,
  },
  invoice_date: {
    type: DataTypes.STRING,
  },

  committed_dispatch_date: {
    type: DataTypes.STRING,
  },
  expected_commisioning_date: {
    type: DataTypes.STRING,
  },
  submittedBy: {
    type: DataTypes.STRING,
  },
});
export default RaiseInvoice;
