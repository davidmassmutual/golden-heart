const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, enum: ['user', 'admin'], required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Anonymous or email-based ID
  userName: { type: String, required: true },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);