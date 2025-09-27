import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import '../styles/SmartHubChat.css'; // New CSS file

const SmartHubChat = () => {
  const [socket, setSocket] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState(''); // From donation form or prompt
  const [userId, setUserId] = useState(''); // e.g., email or anonymous
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prompt for user details if not passed from Donate
    if (!userName || !userId) {
      const name = prompt('Enter your name for chat:');
      const id = prompt('Enter your email (or "anonymous"):');
      setUserName(name);
      setUserId(id || 'anonymous');
    }

    // Create chat
    const createChat = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/chats', { userName, userId });
        setChatId(res.data.chatId);
      } catch (err) {
        console.error('Error creating chat');
      }
    };

    if (userName && userId) {
      createChat();
    }

    // Connect to Socket.io
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, [userName, userId]);

  useEffect(() => {
    if (socket && chatId) {
      socket.emit('join-chat', chatId);

      socket.on('new-message', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      socket.on('error', (err) => {
        alert(err);
      });
    }
  }, [socket, chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket && chatId) {
      socket.emit('send-message', { chatId, text: message, sender: 'user' });
      setMessage('');
    }
  };

  if (loading) return <div>Loading chat...</div>;

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>SmartHub Support - Payment Info</h2>
        <p>Chat with admin for donation details (e.g., bank/PayPal info).</p>
      </header>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'You' : 'Admin'}:</strong> {msg.text}
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SmartHubChat;