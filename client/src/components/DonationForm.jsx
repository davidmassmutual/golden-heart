import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DonationForm.css';

function DonationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    paymentMethod: '',
    message: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/donations', formData);
      setSuccess('Thank you for your donation!');
      setFormData({ name: '', email: '', amount: '', paymentMethod: '', message: '' });
      setError('');
    } catch (error) {
      console.error('Error submitting donation:', error);
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Donation Amount ($):
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Payment Method:
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Payment Method --</option>
          <option value="paypal">PayPal</option>
          <option value="credit_card">Credit/Debit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="crypto">Cryptocurrency</option>
        </select>
      </label>
      <label>
        Message (Optional):
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Donate</button>
    </form>
  );
}

export default DonationForm;