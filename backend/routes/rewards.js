const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  const points = req.user.ecoPoints;
  const level = req.user.level;
  const nextThresholds = { '🌱 Eco Beginner': 101, '🌿 Green Explorer': 501, '🌳 Eco Champion': 1501, '🌍 Planet Protector': null };
  res.json({
    totalPoints: points,
    level,
    nextLevelAt: nextThresholds[level] || null,
    rewards: [
      { action: 'Plastic segregated', points: 10 },
      { action: 'Paper segregated', points: 10 },
      { action: 'E-Waste reported', points: 20 },
      { action: 'Community report', points: 15 },
      { action: 'EcoLearn completed', points: 5 },
      { action: 'Daily challenge', points: 50 },
    ]
  });
});

module.exports = router;
