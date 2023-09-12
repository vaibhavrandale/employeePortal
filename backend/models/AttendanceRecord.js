import mongoose from 'mongoose';

// Define the schema for individual attendance records
const AttendanceRecordSchema = new mongoose.Schema({
  employee_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  loginTime: Date,
  logoutTime: Date,
  // Calculate and store total hours (you may need a custom function for this)
  totalHours: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
});

// Create a model based on the schema
const AttendanceRecord = mongoose.model(
  'AttendanceRecord',
  AttendanceRecordSchema
);

// Export the AttendanceRecord model
export default AttendanceRecord;
