import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';
import imgLogo from '../images/orphlogo.avif';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={imgLogo} alt="Golden Heart Orphanage" />
      </div>
      
      <button 
        className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to="/" end onClick={toggleMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={toggleMenu}>About</NavLink></li>
          <li><NavLink to="/programs" onClick={toggleMenu}>Programs</NavLink></li>
          <li><NavLink to="/donate" onClick={toggleMenu}>Donate</NavLink></li>
          <li><NavLink to="/news" onClick={toggleMenu}>News</NavLink></li>
          <li><NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;