// client/src/components/DonationForm.js (simplified)
import React, { useState } from 'react';
import axios from 'axios';
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/donations`, formData);
      setSuccess('Donation submitted successfully! Open chat for payment details.');
      // Open Smartsupp chat
      if (window.Smartsupp) {
        window.Smartsupp('chat', 'open');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error submitting donation');
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
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default DonationForm;