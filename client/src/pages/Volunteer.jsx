import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Volunteer.css';

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    idFile: null,
    message: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axios.post('http://localhost:5000/api/volunteers', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(response.data.message || 'Volunteer application submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        idFile: null,
        message: '',
      });
      setError('');
    } catch (err) {
      console.error('Volunteer form error:', err.response?.data || err);
      setError(err.response?.data?.error || 'Error submitting application. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="volunteer-page">
      {/* Hero Section */}
      <section className="volunteer-hero">
        <div className="overlay">
          <h1>Become a Volunteer</h1>
          <p>
            Join Golden Heart Orphanage in making a difference. Your time, skills,
            and love can change lives.
          </p>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="volunteer-why container">
        <h2>💖 Why Volunteer?</h2>
        <p>
          Volunteering at Golden Heart Orphanage is more than service—it’s an act
          of love. By giving your time, you help children access education,
          healthcare, and a brighter future. Volunteers build strong communities,
          share knowledge, and inspire hope.
        </p>
      </section>

      {/* Roles Section */}
      <section className="volunteer-roles container">
        <h2>🌍 Volunteer Roles</h2>
        <div className="roles-grid">
          <div className="role-card">
            <h3>📚 Teacher</h3>
            <p>Help children learn subjects, life skills, and computer literacy.</p>
          </div>
          <div className="role-card">
            <h3>🤝 Caregiver</h3>
            <p>Provide love, mentorship, and daily support for the children.</p>
          </div>
          <div className="role-card">
            <h3>🎉 Fundraiser</h3>
            <p>Organize events and campaigns to raise resources for our programs.</p>
          </div>
          <div className="role-card">
            <h3>🗂️ Admin Support</h3>
            <p>Assist with record-keeping, program management, and communications.</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="volunteer-process container">
        <h2>🛠️ The Process</h2>
        <ol>
          <li><strong>Apply:</strong> Complete the application form below.</li>
          <li><strong>Background Check:</strong> Ensures the safety of children.</li>
          <li><strong>Onboarding:</strong> Training and orientation sessions.</li>
          <li><strong>Start:</strong> Begin your journey as a Golden Heart volunteer!</li>
        </ol>
      </section>

      {/* Application Form */}
      <section className="volunteer-form container">
        <h2>📋 Volunteer Application</h2>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
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
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Preferred Role:
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">-- Select a Role --</option>
              <option value="teacher">Teacher</option>
              <option value="caregiver">Caregiver</option>
              <option value="fundraiser">Fundraiser</option>
              <option value="admin">Admin Support</option>
            </select>
          </label>
          <label>
            Upload ID (PDF/JPG/PNG):
            <input
              type="file"
              name="idFile"
              onChange={handleChange}
              accept=".pdf,.jpg,.png"
              required
            />
          </label>
          <label>
            Why do you want to volunteer?
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit Application</button>
        </form>
      </section>
    </div>
  );
};

export default Volunteer;