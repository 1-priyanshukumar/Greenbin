const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, optionalAuth } = require('../middleware/auth');
const WasteScan = require('../models/WasteScan');
const User = require('../models/User');
const { analyzeWasteImage } = require('../services/aiService');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// POST /api/waste/analyze
router.post('/analyze', optionalAuth, upload.single('image'), async (req, res) => {
  try {
    const imageFile = req.file;
    if (!imageFile) return res.status(400).json({ message: 'Image required' });

    // Directly execute integrated AI waste classification service
    const aiResult = await analyzeWasteImage(imageFile);

    // Save scan record
    const scan = await WasteScan.create({
      userId: req.user?._id,
      imageUrl: `/uploads/${imageFile.filename}`,
      detectedItem: aiResult.detectedItem,
      category: aiResult.category,
      confidence: aiResult.confidence,
      recyclable: aiResult.recyclable,
      recommendedBin: aiResult.recommendedBin,
      disposalMethod: aiResult.recommendedBin,
      disposalInstructions: aiResult.disposalInstructions,
      sustainabilityTip: aiResult.sustainabilityTip,
      points: aiResult.ecoPoints,
    });

    // Update user statistics if logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: {
          ecoPoints: aiResult.ecoPoints,
          totalScans: 1,
          recyclable: aiResult.recyclable ? 1 : 0,
          organic: aiResult.category === 'Organic' ? 1 : 0,
          eWaste: aiResult.category === 'E-Waste' ? 1 : 0,
        }
      });
      const user = await User.findById(req.user._id);
      user.updateLevel();
      await user.save();
    }

    res.json({ ...aiResult, scanId: scan._id });
  } catch (err) {
    console.error('Analyze error:', err.message);
    res.status(500).json({ message: 'Analysis failed' });
  }
});

// GET /api/waste/history
router.get('/history', protect, async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const filter = req.query.category ? { userId: req.user._id, category: req.query.category } : { userId: req.user._id };
  const scans = await WasteScan.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
  const total = await WasteScan.countDocuments(filter);
  res.json({ scans, total, page });
});

// GET /api/waste/:id
router.get('/:id', protect, async (req, res) => {
  const scan = await WasteScan.findById(req.params.id);
  if (!scan) return res.status(404).json({ message: 'Scan not found' });
  res.json(scan);
});

module.exports = router;
