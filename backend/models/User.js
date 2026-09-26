const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  ecoPoints: { type: Number, default: 0 },
  level: { type: String, default: '🌱 Eco Beginner' },
  isAdmin: { type: Boolean, default: false },
  totalScans: { type: Number, default: 0 },
  recyclable: { type: Number, default: 0 },
  organic: { type: Number, default: 0 },
  eWaste: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.updateLevel = function() {
  const pts = this.ecoPoints;
  if (pts > 1500) this.level = '🌍 Planet Protector';
  else if (pts > 500) this.level = '🌳 Eco Champion';
  else if (pts > 100) this.level = '🌿 Green Explorer';
  else this.level = '🌱 Eco Beginner';
};

module.exports = mongoose.model('User', userSchema);
