const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');

// POST: Submit donation
router.post('/', async (req, res) => {
  try {
    const { name, email, amount, paymentMethod } = req.body;
    const donation = new Donation({ name, email, amount, paymentMethod });
    await donation.save();
    res.status(201).json({ message: 'Donation submitted' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting donation' });
  }
});

module.exports = router;