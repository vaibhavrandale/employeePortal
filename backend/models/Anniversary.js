import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance

// Define the BirthdayWish model
const Anniversary = sequelize.define('Anniversary', {
  anniversary_employee_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anniversary_employee_joining_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anniversary_employee_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anniversary_employee_employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anniversary_employee_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Anniversary;
