import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EmployeeExpense = sequelize.define(
  'EmployeeExpense',
  {
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sitename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    siteLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING, // Change to DATE if you prefer storing dates
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING, // Change to DATE if you prefer storing dates
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ApprovedBy: {
      type: DataTypes.STRING,
    },
    ApprovedBy2: {
      type: DataTypes.STRING,
    },
    ApprovedAt: {
      type: DataTypes.STRING, // Change to DATE if you prefer storing dates
    },
    AdvanceAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AdvanceAmountDate: {
      type: DataTypes.STRING, // Change to DATE if you prefer storing dates
      allowNull: false,
    },
    Settled: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SettledBy: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const DaywiseExpenses = sequelize.define(
  'DaywiseExpenses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING, // Change to DATE if you prefer storing dates
      allowNull: false,
    },
    expense: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

EmployeeExpense.hasMany(DaywiseExpenses, {
  foreignKey: 'EmployeeExpenseId',
});
DaywiseExpenses.belongsTo(EmployeeExpense);

export { EmployeeExpense, DaywiseExpenses };
