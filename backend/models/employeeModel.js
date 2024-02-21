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
    isDirector: {
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
