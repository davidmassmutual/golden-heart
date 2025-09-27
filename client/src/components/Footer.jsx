// client/src/components/Footer.js
import React, { useState } from 'react';
import '../styles/Footer.css';

function Footer() {
  const [showModal, setShowModal] = useState(false);

  const handleSocialClick = (e) => {
    e.preventDefault(); // Prevent default link navigation
    setShowModal(true); // Show modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide modal
  };

  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2025 Golden Heart Orphanage. All rights reserved.</p>
        <div className="footer-links">
          <a href="/contact">Contact</a>
        </div>
        <div className="socials">
          <a href="#" onClick={handleSocialClick}>Facebook</a>
          <a href="#" onClick={handleSocialClick}>Twitter</a>
          <a href="#" onClick={handleSocialClick}>Instagram</a>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Restricted Access</h3>
            <p>Only VIP donors can contact our socials.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;