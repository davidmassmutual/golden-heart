import Hero from '../components/Hero';
import Card from '../components/Card';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <Hero
        title="Welcome to Golden Heart Orphanage"
        subtitle="Transforming lives through love, care, and opportunity."
        ctaText="Donate Now"
        ctaLink="/donate"
        backgroundImage="/assets/hero-image.jpg"
      />
      <section className="mission">
        <h2>Our Mission</h2>
        <p>Providing a nurturing home for orphaned children...</p>
      </section>
      <section className="highlights">
        <Card title="Education" description="Empowering kids through learning." image="/assets/education.jpg" />
        <Card title="Healthcare" description="Ensuring every child is healthy." image="/assets/healthcare.jpg" />
        <Card title="Shelter" description="A safe home for every child." image="/assets/shelter.jpg" />
      </section>
    </div>
  );
}
export default Home;