import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance
// UID, Name, employee_id, IN_TIME, OUT_TIME, rfid_checkcol, isLeave, LeaveType
const RfidCkeck = sequelize.define(
  'RfidCkeck',
  {
    UID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // IN_TIME: {
    //   type: DataTypes.DATE,
    // },
    // OUT_TIME: {
    //   type: DataTypes.DATE,
    // },

    //1ST ENTRY

    IN_LATTITUDE_1: {
      type: DataTypes.STRING,
    },
    IN_LONGITUDE_1: {
      type: DataTypes.STRING,
    },
    IN_TIME_1: {
      type: DataTypes.STRING,
    },

    OUT_LATTITUDE_1: {
      type: DataTypes.STRING,
    },
    OUT_LONGITUDE_1: {
      type: DataTypes.STRING,
    },
    OUT_TIME_1: {
      type: DataTypes.STRING,
    },

    //2ND ENTRY

    IN_LATTITUDE_2: {
      type: DataTypes.STRING,
    },
    IN_LONGITUDE_2: {
      type: DataTypes.STRING,
    },
    IN_TIME_2: {
      type: DataTypes.STRING,
    },

    OUT_LATTITUDE_2: {
      type: DataTypes.STRING,
    },
    OUT_LONGITUDE_2: {
      type: DataTypes.STRING,
    },
    OUT_TIME_2: {
      type: DataTypes.STRING,
    },

    //3RD ENTRY

    IN_LATTITUDE_3: {
      type: DataTypes.STRING,
    },
    IN_LONGITUDE_3: {
      type: DataTypes.STRING,
    },
    IN_TIME_3: {
      type: DataTypes.STRING,
    },

    OUT_LATTITUDE_3: {
      type: DataTypes.STRING,
    },
    OUT_LONGITUDE_3: {
      type: DataTypes.STRING,
    },
    OUT_TIME_3: {
      type: DataTypes.STRING,
    },

    totalHours: {
      type: DataTypes.FLOAT, // Assuming totalHours can be a decimal value
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isLeave: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    LeaveType: {
      type: DataTypes.STRING, // Change the data type based on your leave types
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable sequelize's default timestamp fields
  }
);

export default RfidCkeck;
