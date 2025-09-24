import { Link } from 'react-router-dom';
import '../styles/Hero.css';

function Hero({ title, subtitle, ctaText, ctaLink, backgroundImage }) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }} aria-label="Hero Section">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Link to={ctaLink} className="cta-button" aria-label={ctaText}>
          {ctaText}
        </Link>
      </div>
    </section>
  );
}

export default Hero;