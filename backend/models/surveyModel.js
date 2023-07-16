import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    verifiedBy: { type: String, required: true },
    verifiededAt: { type: String, required: true },
    remark: { type: String, required: true },
    remarkBy: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const surveySchema = new mongoose.Schema({
  surveyId: { type: String, required: true, unique: true },
  projectCode: { type: String, required: true },
  block: { type: String },
  row: { type: String },
  table: { type: String },
  structure: { type: String },
  A: { type: String },
  B: { type: String },
  C: { type: String },
  D: { type: String },
  E: { type: String },

  F: { type: String },
  G: { type: String },
  H: { type: String },
  I: { type: String },
  J: { type: String },

  htablex: { type: String },
  htabley: { type: String },
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
