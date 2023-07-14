import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    verifiedBy: { type: String },
    verifiededAt: { type: String },
    remark: { type: String },
    remarkBy: { type: String },
  },
  {
    timestamps: true,
  }
);

const surveySchema = new mongoose.Schema({
  surveyId: { type: String, required: true, unique: true },
  projectCode: { type: String, required: true },
  block: { type: String, required: true },
  row: { type: String, required: true },
  table: { type: String, required: true },
  structure: { type: String, required: true },
  A: { type: String, required: true },
  B: { type: String, required: true },
  C: { type: String, required: true },
  D: { type: String, required: true },
  E: { type: String, required: true },

  F: { type: String, required: true },
  G: { type: String, required: true },
  H: { type: String, required: true },
  I: { type: String, required: true },
  J: { type: String, required: true },

  htablex: { type: String, required: true },
  htabley: { type: String, required: true },
  img: { type: String },
  images: [String],
  submittedBy: { type: String, required: true },
  submittedAt: { type: String, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  reviews: [reviewSchema],
  status: { type: Boolean, default: false },
});

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
