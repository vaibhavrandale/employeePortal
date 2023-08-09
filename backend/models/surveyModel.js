import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    // verifiedBy: { type: String, required: true },
    // verifiededAt: { type: String, required: true },
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
  table: { type: Number },
  structure: { type: String },
  A: { type: String },
  ImageA: { type: String },
  B: { type: String },
  ImageB: { type: String },
  C: { type: String },
  ImageC: { type: String },
  D: { type: String },
  ImageD: { type: String },
  E: { type: String },
  ImageE: { type: String },
  F: { type: String },
  ImageF: { type: String },
  G: { type: String },
  ImageG: { type: String },

  I: { type: String },
  ImageI: { type: String },
  J: { type: String },
  ImageJ: { type: String },

  // H: { type: String },
  // ImageH: { type: String },
  // htablex: { type: String },
  // htabley: { type: String },

  H: [String], // Change from 'String' to '[String]'
  ImageH: [String], // Change from 'String' to '[String]'
  htablex: [String], // Change from 'String' to '[String]'
  htabley: [String], // Change from 'String' to '[String]'

  img: { type: String },
  images: [String],
  submittedBy: { type: String, required: true },
  submittedByEmail: { type: String, required: true },
  submittedAt: { type: String, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  reviews: [reviewSchema],
  status: { type: Boolean, default: false },
  verifiedBy: { type: String },
  verifiededAt: { type: String },
});

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
