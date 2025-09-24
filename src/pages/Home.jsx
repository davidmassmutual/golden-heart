import Hero from '../components/Hero';
import Card from '../components/Card';
import '../styles/Home.css';
import img1 from '../images/orph1.webp';
import img2 from '../images/orph2.jpg';
import img3 from '../images/orph3.png';
import img6 from '../images/orph6.jpg';
import img7 from '../images/orph7.jpeg';
import img8 from '../images/orph8.jpeg';
import imgHero from '../images/orph9.jpg';
import CountUp from "react-countup";




function Home() {
  const newsItems = [
    {
      id: 1,
      title: "Crisis in Gaza: Children Need Urgent Help",
      description: "Thousands of children in Gaza face dire conditions due to ongoing conflict. Support our relief efforts.",
      image: img1,
      link: "/news/gaza-crisis",
    },
    {
      id: 2,
      title: "New Education Program Launched",
      description: "Our latest initiative provides schooling for 200 orphaned children in rural areas.",
      image: img2,
      link: "/news/education-program",
    },
    {
      id: 3,
      title: "Healthcare Outreach in Africa",
      description: "Our mobile clinics are reaching orphaned children with life-saving care.",
      image: img3,
      link: "/news/healthcare-outreach",
    },
  ];

  return (
    <div className="home">
      <Hero
        title="Golden Heart Orphanage"
        subtitle="Transforming lives through love, care, and opportunity for orphaned children worldwide."
        ctaText="Donate Now"
        ctaLink="/donate"
        backgroundImage={imgHero}
      />
      <section className="mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            At Golden Heart Orphanage, we are committed to providing a safe, nurturing, and loving environment for
            orphaned children. Our mission is to empower every child with education, healthcare, and emotional support,
            ensuring they have the opportunity to thrive and build a brighter future. Since our founding in 2010, we have
            impacted over 5,000 children across 10 countries, offering them hope and a place to call home.
          </p>
          <a href="/about" className="learn-more">Learn More About Us</a>
        </div>
      </section>
      
      <section className="news">
        <div className="container">
          <h2>Children in Need</h2>
          <div className="news-grid">
            {newsItems.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="highlights">
      <section className="stats">
  <div className="container">
    <h2>Our Impact</h2>
    <div className="stats-grid">
      <div className="stats-item">
        <span className="number">
          <CountUp end={5000} duration={3} separator="," />+
        </span>
        <span className="label">Children Helped</span>
      </div>
      <div className="stats-item">
        <span className="number">
          <CountUp end={10} duration={3} />
        </span>
        <span className="label">Countries Served</span>
      </div>
      <div className="stats-item">
        <span className="number">
          <CountUp end={15} duration={3} />
        </span>
        <span className="label">Years of Service</span>
      </div>
    </div>
  </div>
</section>
        <div className="container">
          <div className="highlights-grid">
            <Card
              title="Education"
              description="Empowering children with quality education and skills for a brighter future."
              image={img6}
              link="/programs/education"
            />
            <Card
              title="Healthcare"
              description="Providing medical care and mental health support to ensure every child is healthy."
              image={img7}
              link="/programs/healthcare"
            />
            <Card
              title="Shelter"
              description="Offering safe, loving homes where children can grow and thrive."
              image={img8}
              link="/programs/shelter"
            />
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container">
          <h2>Join Our Cause</h2>
          <p>Your support can change a child’s life. Donate or volunteer today to make a difference.</p>
          <div className="cta-buttons">
            <a href="/donate" className="cta-button">Donate Now</a>
            <a href="/volunteer" className="cta-button secondary">Volunteer</a>
          </div>
        </div>
      </section>
      <section className="reviews">
  <div className="container">
    <h2>What People Say</h2>
    <div className="reviews-grid">
      <div className="review-card">
        <p>“Golden Heart Orphanage has truly changed lives. Their dedication is inspiring.”</p>
        <h4>- Sarah M.</h4>
      </div>
      <div className="review-card">
        <p>“I volunteered last summer, and the love these children receive is heartwarming.”</p>
        <h4>- James O.</h4>
      </div>
      <div className="review-card">
        <p>“My donation made a real difference. I’ll always support this mission.”</p>
        <h4>- Aisha K.</h4>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}

export default Home;