import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2025 Golden Heart Orphanage. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/donate">Donate</a>
        </div>
        <div className="socials">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;