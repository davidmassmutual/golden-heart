// client/src/pages/SmartHubChat.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import '../styles/SmartHubChat.css';

const SmartHubChat = () => {
  const { chatId } = useParams();
  const { state } = useLocation();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`);
    setSocket(newSocket);

    newSocket.emit('join-chat', chatId);

    newSocket.on('new-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on('error', (err) => {
      setError(err);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      socket.emit('send-message', {
        chatId,
        text: message,
        sender: 'user',
      });
      setMessage('');
    } catch (err) {
      setError('Error sending message');
    }
  };

  return (
    <div className="smarthub-chat-container">
      <h2>Chat with Support</h2>
      {error && <p className="error">{error}</p>}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SmartHubChat;