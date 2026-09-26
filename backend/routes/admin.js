const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const WasteScan = require('../models/WasteScan');
const Report = require('../models/Report');

// GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  const [users, scans, reports, resolved] = await Promise.all([
    User.countDocuments({ isAdmin: false }),
    WasteScan.countDocuments(),
    Report.countDocuments(),
    Report.countDocuments({ status: 'Resolved' }),
  ]);
  const recyclableScans = await WasteScan.countDocuments({ recyclable: true });
  const eWasteScans = await WasteScan.countDocuments({ category: 'E-Waste' });
  res.json({ users, scans, reports, recyclable: recyclableScans, eWaste: eWasteScans, resolved });
});

// GET /api/admin/reports
router.get('/reports', protect, adminOnly, async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 }).populate('userId', 'name email');
  res.json(reports.map(r => ({
    id: r._id,
    issue: r.issueType,
    location: r.location,
    by: r.userId ? `User#${r.userId._id.toString().slice(-4)}` : 'Anonymous',
    date: new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    status: r.status,
  })));
});

module.exports = router;
