import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    img: { type: String },
    title: { type: String },
    date: { type: String },
    subject: { type: String },
    description: { type: String },
    highlightPoints: [],
    noticeBy: { type: String },
    seal: { type: String },
    mobile_no: { type: String },
    attachments: [
      {
        url: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
