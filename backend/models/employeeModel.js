// import mongoose from 'mongoose';
// // Define the payslip sub-document schema
// const payslipSchema = new mongoose.Schema(
//   {
//     month: { type: String, required: true }, // Month of the payslip
//     year: { type: Number, required: true }, // Year of the payslip
//     salary: { type: Number, required: true }, // Salary for the specified month and year
//     deductions: { type: Number, default: 0 }, // Any deductions from the salary
//     deductionReason: { type: String, default: 'NA' },
//     bonuses: { type: Number, default: 0 }, // Any bonuses or additional payments
//     status: { type: Boolean, default: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// const LeaveSchema = new mongoose.Schema(
//   {
//     employee_id: { type: String },
//     email: { type: String },
//     name: { type: String },
//     type: { type: String },
//     other: { type: String },
//     expectedDateOfLeave: { type: String },
//     expectedDateOfreturn: { type: String },
//     reasonInDetail: { type: String },
//     mobileNo: { type: String },
//     approved: { type: Boolean, default: false },
//     approvedBy: { type: String },
//     remark: { type: String },
//     approvedAt: { type: String },
//     remarkBy: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// const employeeSchema = new mongoose.Schema(
//   {
//     employee_id: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     name: { type: String, required: true, unique: true },
//     firstName: { type: String, required: true, unique: true },
//     lastName: { type: String, required: true, unique: true },
//     father_husband_name: { type: String, required: true },
//     gender: { type: String, required: true },
//     birth_date: { type: String, required: true },
//     marital_status: { type: String, required: true },
//     address: { type: String, required: true },
//     sub_locality: { type: String, required: true },
//     district: { type: String, required: true },
//     state: { type: String, required: true },
//     pinCode: { type: String, required: true },
//     mobile_no: { type: String, required: true },

//     nominee_name: { type: String, required: true },
//     nominee_relationship: { type: String, required: true },
//     nominee_address: { type: String, required: true },
//     nominee_sub_locality: { type: String, required: true },
//     nominee_district: { type: String, required: true },
//     nominee_state: { type: String, required: true },
//     nominee_mobile_no: { type: String, required: true },
//     nominee_pinCode: { type: String, required: true },
//     nominee_email: { type: String, required: true, unique: true },
//     no_of_family_members: { type: String, required: true },

//     alternate_mobile_no: { type: String, required: true },
//     personal_email: { type: String, required: true, unique: true },

//     aadhar_no: { type: String, required: true, unique: true },
//     pan_number: { type: String, required: true, unique: true },
//     bank_account_no: { type: String, required: true },
//     aadhar_card_file: { type: String, required: true, unique: true },
//     pan_card_file: { type: String, required: true, unique: true },
//     bank_account_file: { type: String, required: true, unique: true },
//     pf_account_no: { type: String, required: true, unique: true },
//     uan_number: { type: String, required: true, unique: true },

//     resetToken: { type: String },

//     password: { type: String, required: true },
//     image: { type: String, required: true },
//     joiningDate: { type: String, required: true },
//     designation: { type: String, required: true },
//     age: { type: Number, required: true },
//     previous_company_name: { type: String, required: true },
//     experience: { type: String, required: true },
//     experience_letter: { type: String, required: true },

//     leaves: { type: Number, default: 18, required: true },
//     sick: { type: Number, default: 3, required: true },
//     privilege: { type: Number, default: 12, required: true },
//     casual: { type: Number, default: 3, required: true },

//     activate: { type: String, required: true, default: false },
//     isAdmin: { type: Boolean, default: false, required: true },
//     isSuperAdmin: { type: Boolean, default: false, required: true },
//     isSales: { type: Boolean, default: false, required: true },
//     isScm: { type: Boolean, default: false, required: true },
//     isDesign: { type: Boolean, default: false, required: true },
//     isProject: { type: Boolean, default: false, required: true },
//     isVisitor: { type: Boolean, default: false, required: true },
//     isProduction: { type: Boolean, default: false, required: true },
//     isAccountant: { type: Boolean, default: false, required: true },

//     payslips: [payslipSchema],
//     allLeaves: [LeaveSchema],

//     ctc: { type: Number, required: true }, // Cost to Company
//     salarygroup: { type: String, required: true }, // Salary group (you can use the appropriate type)
//     basic: { type: Number }, // Basic salary
//     hra: { type: Number }, // House Rent Allowance
//     conveyance: { type: Number }, // Conveyance allowance
//     medical: { type: Number }, // Medical allowance
//     special: { type: Number }, // Special allowance
//     pt: { type: Number }, // Professional Tax
//     pf: { type: Number }, // Provident Fund
//     esi: { type: Number }, // Employee State Insurance
//     total_deduction: { type: Number }, // Total deductions
//     gross: { type: Number }, // Gross salary
//     netsalary: { type: Number }, // Net salary
//     employer_pf: { type: Number }, // Employer Provident Fund contribution
//     employer_esi: { type: Number }, // Employer Employee State Insurance contribution
//     bonus: { type: Number }, // Bonus
//   },
//   {
//     timestamps: true,
//   }
// );

// const Employee = mongoose.model('Employee', employeeSchema);

// export default Employee;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Employee = sequelize.define(
  'Employee',
  {
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    UID: {
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    father_husband_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marital_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressProof: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_locality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_relationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_sub_locality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nominee_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    no_of_family_members: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternate_mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personal_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    aadhar_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bank_account_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ifsc_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aadhar_card_file: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pan_card_file: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bank_account_file: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pf_account_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    resetToken: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joiningDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    previous_company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience_letter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leaves: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
      allowNull: false,
    },
    sick: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      allowNull: false,
    },
    privilege: {
      type: DataTypes.INTEGER,
      defaultValue: 12,
      allowNull: false,
    },
    casual: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      allowNull: false,
    },
    activate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isSuperAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isSales: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isScm: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isDesign: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isProject: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isVisitor: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isProduction: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isAccountant: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isHr: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isSoftwareDevlopment: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    isHardwareDevlopment: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
    },
    // ifsc_code isSoftwareDevlopment isHardwareDevlopment
    isProbation: {
      type: DataTypes.INTEGER,
    },

    tenth_marksheet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenth_grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tenth_schoolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    twelth_or_diploma_marksheet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twelth_or_diploma_grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    twelth_or_diploma_collegeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    under_geaduate_or_post_graduate_marksheet: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    under_geaduate_or_post_graduate_grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    under_geaduate_or_post_graduate_collegeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Employee;
