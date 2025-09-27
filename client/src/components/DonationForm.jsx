// client/src/components/DonationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../styles/DonationForm.css';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    paymentMethod: 'PayPal',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      // Submit donation
      const donationResponse = await axios.post(`${apiUrl}/api/donations`, formData);
      setSuccess('Donation submitted successfully!');

      // Create chat session with validated data
      const userName = formData.name.trim() || 'Anonymous';
      const userId = formData.email.trim() || `anonymous-${Date.now()}@noemail.com`;
      const chatResponse = await axios.post(`${apiUrl}/api/chats`, {
        userName,
        userId,
      });

      if (!chatResponse.data.chatId) {
        throw new Error('No chatId returned from server');
      }

      // Connect to Socket.io
      const socket = io(apiUrl);
      socket.emit('join-chat', chatResponse.data.chatId);
      socket.emit('send-message', {
        chatId: chatResponse.data.chatId,
        text: `Hello, I just submitted a donation of $${formData.amount}. Please provide payment details (e.g., PayPal or bank info).`,
        sender: 'user',
      });

      // Redirect to SmartHub chat
      navigate(`/smarthub-chat/${chatResponse.data.chatId}`, {
        state: { userName, userId },
      });
    } catch (err) {
      console.error('Donation or chat error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error submitting donation or starting chat');
    }
  };

  return (
    <div className="donation-form-container">
      <h2>Make a Donation</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
        </div>
        <div>
          <label>Amount ($)</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div>
          <label>Payment Method</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="PayPal">PayPal</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <div>
          <label>Message (Optional)</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" />
        </div>
        <button type="submit">Request Payment Info</button>
      </form>
    </div>
  );
};

export default DonationForm;