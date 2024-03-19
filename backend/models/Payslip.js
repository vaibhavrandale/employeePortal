import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance
// UID, Name, employee_id, IN_TIME, OUT_TIME, rfid_checkcol, isLeave, LeaveType
const Payslip = sequelize.define(
  'Payslip',
  {
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ctc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salarygroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    basic: {
      type: DataTypes.INTEGER,
    },
    hra: {
      type: DataTypes.INTEGER,
    },
    conveyance: {
      type: DataTypes.INTEGER,
    },
    medical: {
      type: DataTypes.INTEGER,
    },
    special: {
      type: DataTypes.INTEGER,
    },
    pt: {
      type: DataTypes.INTEGER,
    },
    pf: {
      type: DataTypes.INTEGER,
    },
    esi: {
      type: DataTypes.INTEGER,
    },
    total_deduction: {
      type: DataTypes.INTEGER,
    },
    gross: {
      type: DataTypes.INTEGER,
    },
    netsalary: {
      type: DataTypes.INTEGER,
    },
    employer_pf: {
      type: DataTypes.INTEGER,
    },
    employer_esi: {
      type: DataTypes.INTEGER,
    },

    bonus: {
      type: DataTypes.INTEGER,
    },

    month: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
    },

    taxableIncome: {
      type: DataTypes.STRING,
    },
    taxRegime: {
      type: DataTypes.STRING,
    },
    tds: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false, // Disable sequelize's default timestamp fields
  }
);

export default Payslip;
