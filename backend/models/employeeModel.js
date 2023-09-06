import mongoose from 'mongoose';
// Define the payslip sub-document schema
const payslipSchema = new mongoose.Schema(
  {
    month: { type: String, required: true }, // Month of the payslip
    year: { type: Number, required: true }, // Year of the payslip
    salary: { type: Number, required: true }, // Salary for the specified month and year
    deductions: { type: Number, default: 0 }, // Any deductions from the salary
    deductionReason: { type: String, default: 'NA' },
    bonuses: { type: Number, default: 0 }, // Any bonuses or additional payments
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const LeaveSchema = new mongoose.Schema(
  {
    employee_id: { type: String },
    email: { type: String },
    name: { type: String },
    type: { type: String },
    other: { type: String },
    expectedDateOfLeave: { type: String },
    expectedDateOfreturn: { type: String },
    reasonInDetail: { type: String },
    mobileNo: { type: String },
    approved: { type: Boolean, default: false },
    approvedBy: { type: String },
    remark: { type: String },
    approvedAt: { type: String },
    remarkBy: { type: String },
  },
  {
    timestamps: true,
  }
);

const employeeSchema = new mongoose.Schema(
  {
    employee_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    father_husband_name: { type: String, required: true },
    gender: { type: String, required: true },
    birth_date: { type: String, required: true },
    marital_status: { type: String, required: true },
    address: { type: String, required: true },
    sub_locality: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    mobile_no: { type: String, required: true },

    nominee_name: { type: String, required: true },
    nominee_relationship: { type: String, required: true },
    nominee_address: { type: String, required: true },
    nominee_sub_locality: { type: String, required: true },
    nominee_district: { type: String, required: true },
    nominee_state: { type: String, required: true },
    nominee_mobile_no: { type: String, required: true },
    nominee_pinCode: { type: String, required: true },
    nominee_email: { type: String, required: true, unique: true },
    no_of_family_members: { type: String, required: true },

    alternate_mobile_no: { type: String, required: true },
    personal_email: { type: String, required: true, unique: true },

    aadhar_no: { type: String, required: true, unique: true },
    pan_number: { type: String, required: true, unique: true },
    bank_account_no: { type: String, required: true },
    aadhar_card_file: { type: String, required: true, unique: true },
    pan_card_file: { type: String, required: true, unique: true },
    bank_account_file: { type: String, required: true, unique: true },
    pf_account_no: { type: String, required: true, unique: true },
    uan_number: { type: String, required: true, unique: true },

    resetToken: { type: String },

    password: { type: String, required: true },
    image: { type: String, required: true },
    joiningDate: { type: String, required: true },
    designation: { type: String, required: true },
    age: { type: Number, required: true },
    previous_company_name: { type: String, required: true },
    experience: { type: String, required: true },
    experience_letter: { type: String, required: true },

    leaves: { type: Number, default: 18, required: true },
    sick: { type: Number, default: 3, required: true },
    privilege: { type: Number, default: 12, required: true },
    casual: { type: Number, default: 3, required: true },

    activate: { type: String, required: true, default: false },
    isAdmin: { type: Boolean, default: false, required: true },
    isSuperAdmin: { type: Boolean, default: false, required: true },
    isSales: { type: Boolean, default: false, required: true },
    isScm: { type: Boolean, default: false, required: true },
    isDesign: { type: Boolean, default: false, required: true },
    isProject: { type: Boolean, default: false, required: true },
    isVisitor: { type: Boolean, default: false, required: true },
    isProduction: { type: Boolean, default: false, required: true },
    isAccountant: { type: Boolean, default: false, required: true },

    payslips: [payslipSchema],
    allLeaves: [LeaveSchema],
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
