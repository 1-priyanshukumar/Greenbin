const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/leaderboard
router.get('/', async (req, res) => {
  const period = req.query.period || 'all_time';
  const leaders = await User.find({ isAdmin: false })
    .sort({ ecoPoints: -1 })
    .limit(20)
    .select('name ecoPoints level totalScans');
  res.json(leaders.map((u, i) => ({
    rank: i + 1,
    name: u.name,
    points: u.ecoPoints,
    level: u.level,
    scans: u.totalScans,
  })));
});

module.exports = router;
