const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  res.status(201).json({ token: generateToken(user._id), user: { _id: user._id, name, email, ecoPoints: 0, level: user.level, isAdmin: false } });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: generateToken(user._id), user: { _id: user._id, name: user.name, email, ecoPoints: user.ecoPoints, level: user.level, isAdmin: user.isAdmin } });
});

// GET /api/auth/profile
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
