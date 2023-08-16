import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: String,
    date: Date,
    description: String,
  },
  {
    timestamps: true,
  }
);
const Event = mongoose.model('Event', eventSchema);

export default Event;
