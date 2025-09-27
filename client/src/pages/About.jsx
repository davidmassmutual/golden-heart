import React from "react";
import "../styles/About.css";
import Card from "../components/Card.jsx";
import missionImg from "../images/mission1.png"; 
import visionImg from "../images/vision1.jpg";
import storyImg from "../images/found1.jpg";
import team1 from "../images/john.webp";
import team2 from "../images/katie.jpg";
import team3 from "../images/sarah.jpg";
import team4 from "../images/timothy.jpg";

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="overlay">
          {/* <h1>About Us</h1> */}
          <p>
            {/* Bringing hope, love, and a brighter future to children in need across the globe. */}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story container">
        <div className="story-content">
          <div className="story-image">
            <img src={storyImg} alt="Our Story" />
          </div>
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2005, Golden Heart Orphanage was built on compassion and a
              strong belief that every child deserves a loving home, access to education,
              healthcare, and a chance to pursue their dreams.
            </p>
            <p>
              Over the years, we have provided shelter, mentorship, and support to
              thousands of children worldwide, working hand in hand with communities
              to create sustainable change.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-mission container">
        <div className="mission-card">
          <img src={missionImg} alt="Mission" />
          <h3>Our Mission</h3>
          <p>
            To provide orphaned and vulnerable children with love, care, education,
            and resources to help them grow into confident and empowered individuals.
          </p>
        </div>
        <div className="mission-card">
          <img src={visionImg} alt="Vision" />
          <h3>Our Vision</h3>
          <p>
            A world where every child has a safe home, equal opportunities, and the
            ability to achieve their fullest potential.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team container">
        <h2>Meet Our Team</h2>
        <p>
          Behind Golden Heart Orphanage is a passionate team committed to
          making a lasting difference in the lives of children.
        </p>
        <div className="team-grid">
          <Card title="Jane Doe" description="Founder & CEO" image={team1} />
          <Card title="Timothy Clatterbuck" description="Director of Operations" image={team2} />
          <Card title="Sarah Johnson" description="Head of Education" image={team3} />
          <Card title="Michael Lee" description="Healthcare Coordinator" image={team4} />
        </div>
      </section>
    </div>
  );
}

export default About;
