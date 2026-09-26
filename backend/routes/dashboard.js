const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const WasteScan = require('../models/WasteScan');
const User = require('../models/User');

// GET /api/dashboard/stats
router.get('/stats', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const categories = await WasteScan.aggregate([
    { $match: { userId: req.user._id } },
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  res.json({
    totalScans: user.totalScans,
    recyclable: user.recyclable,
    organic: user.organic,
    eWaste: user.eWaste,
    ecoPoints: user.ecoPoints,
    level: user.level,
    categories,
  });
});

// GET /api/dashboard/activity
router.get('/activity', protect, async (req, res) => {
  const monthly = await WasteScan.aggregate([
    { $match: { userId: req.user._id } },
    { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);
  res.json({ monthly });
});

module.exports = router;
