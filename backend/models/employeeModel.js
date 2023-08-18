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
    name: { type: String, required: true, unique: true },
    employee_id: { type: String, required: true, unique: true },

    resetToken: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    joiningDate: { type: String, required: true },
    birth_date: { type: String, required: true },
    gender: { type: String, required: true },
    designation: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    mobile_no: { type: String, required: true },
    age: { type: Number, required: true },
    experience: { type: String, required: true },

    allLeaves: [LeaveSchema],
    leaves: { type: Number, default: 18, required: true },
    sick: { type: Number, default: 3, required: true },
    privilege: { type: Number, default: 12, required: true },
    casual: { type: Number, default: 3, required: true },

    activate: { type: String, required: true },
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
    pf_account_no: { type: String, required: true },
    bank_account_no: { type: String, required: true },
    uan_number: { type: String, required: true },
    pan_number: { type: String, required: true },
    aadhar_no: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
