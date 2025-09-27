// server/routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Contact message saved successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).json({ error: 'Error saving contact message' });
  }
});

module.exports = router;