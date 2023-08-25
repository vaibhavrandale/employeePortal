import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
  {
    checkin: { type: Boolean, default: false },
    userId: String,
    userEmail: String,
    userName: String,
    loginTime: Date,
    logoutTime: Date,
    totalHours: Number,
  },
  {
    timestamps: true,
  }
);
const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
