const mongoose = require('mongoose');

const wasteScanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: { type: String },
  detectedItem: { type: String, required: true },
  category: { type: String, required: true },
  confidence: { type: Number, required: true },
  recyclable: { type: Boolean, default: false },
  recommendedBin: { type: String },
  disposalMethod: { type: String },
  disposalInstructions: [String],
  sustainabilityTip: { type: String },
  points: { type: Number, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model('WasteScan', wasteScanSchema);
