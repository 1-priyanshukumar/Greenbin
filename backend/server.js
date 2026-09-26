require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads dir exists
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });
}

// Frontend Dist Path
const frontendDist = path.resolve(__dirname, '../frontend/dist');

// Serve static assets first
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  console.log('📦 Serving React Frontend static build from:', frontendDist);
}

// Root Route explicitly returning index.html
app.get('/', (req, res) => {
  if (fs.existsSync(path.join(frontendDist, 'index.html'))) {
    res.sendFile(path.join(frontendDist, 'index.html'));
  } else {
    res.send('🌱 GreenBin API Server Running');
  }
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/waste', require('./routes/waste'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/rewards', require('./routes/rewards'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/recycling-centers', require('./routes/centers'));
app.use('/api/ecolearn', require('./routes/ecolearn'));
app.use('/api/admin', require('./routes/admin'));

// API Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'GreenBin Combined App', time: new Date() }));

// SPA Fallback for non-API client routes
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api') && fs.existsSync(path.join(frontendDist, 'index.html'))) {
    return res.sendFile(path.join(frontendDist, 'index.html'));
  }
  next();
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/greenbin';

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('✅ Connected to local MongoDB');
  } catch (err) {
    console.log('⚠️ Local MongoDB not found, starting MongoMemoryServer...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('✅ Connected to in-memory MongoDB at', uri);
    } catch (memErr) {
      console.error('❌ Failed to start in-memory MongoDB:', memErr.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🌱 GreenBin Application URL: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
  });

  try {
    await require('./utils/seed')();
  } catch (sErr) {
    console.log('Seed completed');
  }
}

startServer();
