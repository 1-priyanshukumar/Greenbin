const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, optionalAuth, adminOnly } = require('../middleware/auth');
const Report = require('../models/Report');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// POST /api/reports
router.post('/', optionalAuth, upload.single('image'), async (req, res) => {
  const { issueType, location, description } = req.body;
  if (!issueType || !location) return res.status(400).json({ message: 'Issue type and location required' });
  const report = await Report.create({
    userId: req.user?._id,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    issueType, location, description,
  });
  res.status(201).json(report);
});

// GET /api/reports (user's own)
router.get('/', protect, async (req, res) => {
  const reports = await Report.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(reports);
});

// GET /api/reports/:id
router.get('/:id', protect, async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: 'Not found' });
  res.json(report);
});

// PATCH /api/reports/:id/status (admin)
router.patch('/:id/status', protect, adminOnly, async (req, res) => {
  const report = await Report.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(report);
});

module.exports = router;
