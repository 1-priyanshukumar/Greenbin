const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function seed() {
  try {
    const adminExists = await User.findOne({ isAdmin: true });
    if (!adminExists) {
      const passwordHash = await bcrypt.hash('admin123', 12);
      await User.create({
        name: 'GreenBin Admin',
        email: 'admin@greenbin.com',
        passwordHash,
        isAdmin: true,
        ecoPoints: 9999,
        level: '🌍 Planet Protector',
      });
      console.log('✅ Admin user seeded: admin@greenbin.com / admin123');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

module.exports = seed;
