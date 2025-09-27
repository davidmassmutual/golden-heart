import React from "react";
import "../styles/Contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="overlay">
          <h1>Contact Us</h1>
          <p>
            We’d love to hear from you! Whether you want to donate, volunteer, or
            simply ask a question, our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info container">
        <div className="info-card">
          <FaEnvelope className="icon" />
          <h3>Email</h3>
          <p>info@goldenheart.org</p>
        </div>
        {/* <div className="info-card">
          <FaPhone className="icon" />
          <h3>Phone</h3>
          <p>+123-456-7890</p>
        </div> */}
        <div className="info-card">
          <FaMapMarkerAlt className="icon" />
          <h3>Address</h3>
          <p>3 United Nations Plaza, New York, NY, 10017, United States</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form container">
        <h2>Send Us a Message</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Your Message" rows="5" required></textarea>
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
