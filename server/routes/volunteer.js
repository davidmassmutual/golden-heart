const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer configuration with file validation
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Allowed extensions
    const extRegex = /\.(pdf|jpg|jpeg|png)$/i;
    // Allowed MIME types, including image/jpg for compatibility
    const mimeRegex = /^(application\/pdf|image\/jpeg|image\/jpg|image\/png)$/;
    const extValid = extRegex.test(path.extname(file.originalname).toLowerCase());
    const mimeValid = mimeRegex.test(file.mimetype);

    console.log('File validation details:', {
      originalName: file.originalname,
      extname: path.extname(file.originalname).toLowerCase(),
      mimetype: file.mimetype,
      extValid,
      mimeValid,
    });

    if (extValid && mimeValid) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed'));
  },
}).single('idFile');

// POST: Submit volunteer application
router.post('/', (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err.message, err);
      return res.status(400).json({ error: `File upload error: ${err.message}` });
    } else if (err) {
      console.error('File validation error:', err.message, err);
      return res.status(400).json({ error: `File validation error: ${err.message}` });
    }
    try {
      const { name, email, phone, role, message } = req.body;
      if (!name || !email || !phone || !role || !message) {
        console.error('Missing required fields:', { name, email, phone, role, message });
        return res.status(400).json({ error: 'All required fields must be provided' });
      }
      const idFile = req.file ? `/uploads/${req.file.filename}` : '';
      const volunteer = new Volunteer({ name, email, phone, role, idFile, message });
      await volunteer.save();
      console.log('Volunteer saved:', volunteer);
      res.status(201).json({ message: 'Volunteer application submitted' });
    } catch (error) {
      console.error('Error saving volunteer:', error.message, err);
      res.status(500).json({ error: `Error submitting application: ${error.message}` });
    }
  });
});

module.exports = router;