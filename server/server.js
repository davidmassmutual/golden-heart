// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const volunteerRoutes = require('./routes/volunteer');
const donationRoutes = require('./routes/donation');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://golden-heart-abc123.vercel.app',
    'https://www.goldenheartorphanage.com',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Routes
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contacts', contactRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Golden Heart Orphanage Backend is alive!' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));