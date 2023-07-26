import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema({
  projectCode: { type: String, required: true, unique: true },
  customerName: { type: String, required: true, unique: true },
  customerLogo: { type: String, required: true },
  siteLocation: { type: String, required: true },
  plantCapacity: { type: String, required: true },
  plantLayout: { type: String },
});

const Sites = mongoose.model('Sites', siteSchema);

export default Sites;
