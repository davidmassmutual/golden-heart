// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const volunteerRoutes = require('./routes/volunteer');
const donationRoutes = require('./routes/donation');
const adminRoutes = require('./routes/admin');
const Chat = require('./models/chat');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ['http://localhost:5173', 'https://goldenheartorphanage.com'],
  methods: ['GET', 'POST'],
}));
const io = new Server(server, {
  cors: { origin: ['http://localhost:5173', 'https://goldenheartorphanage.com'], methods: ['GET', 'POST'] },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);

// Chat routes
app.post('/api/chats', async (req, res) => {
  try {
    const { userName, userId } = req.body;
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({ userId, userName });
      await chat.save();
    }
    res.json({ chatId: chat._id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating chat' });
  }
});

app.get('/api/chats', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chats' });
  }
});



// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-chat', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on('send-message', async (data) => {
    const { chatId, text, sender } = data;
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) return socket.emit('error', 'Chat not found');

      chat.messages.push({ text, sender });
      await chat.save();

      io.to(chatId).emit('new-message', { text, sender, timestamp: new Date() });
    } catch (error) {
      socket.emit('error', 'Error sending message');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));