import React, { useEffect, useState, useRef } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import "../styles/Home.css";
import img1 from "../images/orph1.webp";
import img2 from "../images/orph2.jpg";
import img3 from "../images/orph3.png";
import img6 from "../images/orph6.jpg";
import img7 from "../images/orph7.jpeg";
import img8 from "../images/orph8.jpeg";
import imgHero from "../images/orph9.jpg";
import CountUp from "react-countup";
import AOS from "aos";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });

    // Scroll to top on reload
    window.scrollTo(0, 0);

    // Detect screen size
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Intersection Observer for stats
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  const reviews = [
    {
      text: "“Golden Heart Orphanage has truly changed lives. Their dedication is inspiring.”",
      author: "- Sarah M.",
    },
    {
      text: "“I volunteered last summer, and the love these children receive is heartwarming.”",
      author: "- James O.",
    },
    {
      text: "“My donation made a real difference. I’ll always support this mission.”",
      author: "- Aisha K.",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <Hero
        title="Golden Heart Orphanage"
        subtitle="Transforming lives through love, care, and opportunity for orphaned children worldwide."
        ctaText="Donate Now"
        ctaLink="/donate"
        backgroundImage={imgHero}
      />

      {/* Mission Section */}
      <section className="mission" data-aos="fade-up">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            At Golden Heart Orphanage, we are committed to providing a safe,
            nurturing, and loving environment for orphaned children. Our mission
            is to empower every child with education, healthcare, and emotional
            support, ensuring they have the opportunity to thrive and build a
            brighter future. Since our founding in 2010, we have impacted over
            5,000 children across 10 countries, offering them hope and a place
            to call home.
          </p>
          <a href="/about" className="learn-more">
            Learn More About Us
          </a>
        </div>
      </section>

      {/* News Section */}
      <section className="news" data-aos="fade-up">
        <div className="container">
          <h2>Children in Need</h2>
          <div className="news-grid">
            {[img1, img2, img3].map((img, i) => (
              <Card
                key={i}
                title={[
                  "Crisis in Gaza: Children Need Urgent Help",
                  "New Education Program Launched",
                  "Healthcare Outreach in Africa",
                ][i]}
                description={[
                  "Thousands of children in Gaza face dire conditions due to ongoing conflict. Support our relief efforts.",
                  "Our latest initiative provides schooling for 200 orphaned children in rural areas.",
                  "Our mobile clinics are reaching orphaned children with life-saving care.",
                ][i]}
                image={img}
                link="/news"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" data-aos="fade-up" ref={statsRef}>
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stats-item">
              <span className="number">
                {startCount ? (
                  <CountUp end={5000} duration={3} separator="," />
                ) : (
                  "0"
                )}
                +
              </span>
              <span className="label">Children Helped</span>
            </div>
            <div className="stats-item">
              <span className="number">
                {startCount ? <CountUp end={10} duration={3} /> : "0"}
              </span>
              <span className="label">Countries Served</span>
            </div>
            <div className="stats-item">
              <span className="number">
                {startCount ? <CountUp end={15} duration={3} /> : "0"}
              </span>
              <span className="label">Years of Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights" data-aos="fade-up">
        <div className="container">
          <div className="highlights-grid">
            <Card
              title="Education"
              description="Empowering children with quality education and skills for a brighter future."
              image={img6}
              link="/programs"
            />
            <Card
              title="Healthcare"
              description="Providing medical care and mental health support to ensure every child is healthy."
              image={img7}
              link="/programs"
            />
            <Card
              title="Shelter"
              description="Offering safe, loving homes where children can grow and thrive."
              image={img8}
              link="/programs"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-aos="zoom-in">
        <div className="container">
          <h2>Join Our Cause</h2>
          <p>
            Your support can change a child’s life. Donate or volunteer today to
            make a difference.
          </p>
          <div className="cta-buttons">
            <a href="/donate" className="cta-button">
              Donate Now
            </a>
            <a href="/volunteer" className="cta-button secondary">
              Volunteer
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews" data-aos="fade-up">
        <div className="container">
          <h2>What People Say</h2>

          {isMobile ? (
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 4000 }}
              loop
              className="reviews-slider"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <div className="review-card">
                    <p>{review.text}</p>
                    <h4>{review.author}</h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div className="review-card" key={index}>
                  <p>{review.text}</p>
                  <h4>{review.author}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
