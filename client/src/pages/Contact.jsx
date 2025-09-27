// client/src/pages/Contact.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      await axios.post(`${apiUrl}/api/contacts`, formData);
      setSuccess('Message submitted successfully! Opening chat...');
      // Open Smartsupp chat
      if (window.smartsupp) {
        window.smartsupp('chat:open');
      }
    } catch (err) {
      // Handle errors safely
      const errorMessage = err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'Error submitting message. Please try again later.';
      setError(errorMessage);
      console.error('Contact form error:', err.message);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="overlay">
          <h1>Contact Us</h1>
          <p>
            We’d love to hear from you! Whether you want to donate, volunteer, or
            simply ask a question, our team is here to help.
          </p>
        </div>
      </section>
      <section className="contact-info container">
        <div className="info-card">
          <FaEnvelope className="icon" />
          <h3>Email</h3>
          <p>info@goldenheart.org</p>
        </div>
        <div className="info-card">
          <FaMapMarkerAlt className="icon" />
          <h3>Address</h3>
          <p>3 United Nations Plaza, New York, NY, 10017, United States</p>
        </div>
      </section>
      <section className="contact-form container">
        <h2>Send Us a Message</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;