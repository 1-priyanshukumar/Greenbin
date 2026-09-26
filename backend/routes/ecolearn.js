const express = require('express');
const router = express.Router();

const ARTICLES = [
  { id: 1, title: 'How to Segregate Household Waste', category: 'Basics', emoji: '🏠', readTime: '4 min', ecoPoints: 5 },
  { id: 2, title: 'How to Recycle Plastic Correctly', category: 'Plastic', emoji: '🔵', readTime: '5 min', ecoPoints: 5 },
  { id: 3, title: 'Paper Recycling Guide', category: 'Paper', emoji: '🟡', readTime: '3 min', ecoPoints: 5 },
  { id: 4, title: 'Safe E-Waste Disposal', category: 'E-Waste', emoji: '🟣', readTime: '6 min', ecoPoints: 10 },
  { id: 5, title: 'What is Composting?', category: 'Organic', emoji: '🟢', readTime: '5 min', ecoPoints: 5 },
  { id: 6, title: 'Understanding Hazardous Waste', category: 'Hazardous', emoji: '🔴', readTime: '7 min', ecoPoints: 10 },
  { id: 7, title: 'Reducing Single-Use Plastic', category: 'Lifestyle', emoji: '♻️', readTime: '4 min', ecoPoints: 5 },
  { id: 8, title: 'Reuse vs Recycle', category: 'Basics', emoji: '🔄', readTime: '3 min', ecoPoints: 5 },
  { id: 9, title: 'Common Waste Mistakes', category: 'Basics', emoji: '⚠️', readTime: '4 min', ecoPoints: 5 },
];

router.get('/', (req, res) => res.json(ARTICLES));
router.get('/:id', (req, res) => {
  const article = ARTICLES.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: 'Not found' });
  res.json(article);
});

module.exports = router;
