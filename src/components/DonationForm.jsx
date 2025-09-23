import { useState } from 'react';
import axios from 'axios';
import '../styles/DonationForm.css';

function DonationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend endpoint
      await axios.post('/api/donations', formData);
      alert('Thank you for your donation!');
      setFormData({ name: '', email: '', amount: '', message: '' });
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Donation Amount ($):
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
      </label>
      <label>
        Message (Optional):
        <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
      </label>
      <button type="submit">Donate</button>
    </form>
  );
}
export default DonationForm;