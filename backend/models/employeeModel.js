import mongoose from 'mongoose';

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
    leaves: { type: Number, default: 10, required: true },
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
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
