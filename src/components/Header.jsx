import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/assets/logo.png" alt="Golden Heart Orphanage" />
      </div>
      <nav>
        <ul>
          <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
          <li><NavLink to="/programs" activeClassName="active">Programs</NavLink></li>
          <li><NavLink to="/donate" activeClassName="active">Donate</NavLink></li>
          <li><NavLink to="/news" activeClassName="active">News</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;