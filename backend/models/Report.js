const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: { type: String },
  issueType: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Submitted', 'Under Review', 'Assigned', 'Resolved'], default: 'Submitted' },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
