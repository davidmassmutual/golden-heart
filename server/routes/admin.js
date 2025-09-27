const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Volunteer = require('../models/volunteer');
const Donation = require('../models/donation');
const authMiddleware = require('../middleware/auth');

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change password route (new)
router.post('/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    // Find the admin by ID from the JWT token
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect' });

    // Validate new password (e.g., minimum length)
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error.message);
    res.status(500).json({ error: 'Error changing password' });
  }
});

// Get volunteers (protected)
router.get('/volunteers', authMiddleware, async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error.message);
    res.status(500).json({ error: 'Error fetching volunteers' });
  }
});

// Get donations (protected)
router.get('/donations', authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error.message);
    res.status(500).json({ error: 'Error fetching donations' });
  }
});
// Add this to existing admin.js routes (after donations GET)
router.get('/chats', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chats' });
  }
});

// server/routes/admin.js (add to existing code)
const Contact = require('../models/contact');

// ... existing admin routes ...

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

module.exports = router;