import React from "react";
import "../styles/New.css";
import img1 from "../images/orph1.webp";
import img2 from "../images/orph2.jpg";
import img3 from "../images/orph3.png";
import img6 from "../images/orph6.jpg";
import img7 from "../images/orph7.jpeg";
import img8 from "../images/orph8.jpeg";

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Crisis in Gaza: Children Need Urgent Help",
      description:
        "Thousands of children in Gaza face dire conditions due to ongoing conflict. Relief efforts are underway to provide shelter, food, and education.",
      image: img1,
      date: "Sept 20, 2025",
      source: "UNICEF",
    },
    {
      id: 2,
      title: "New Education Program Launched in Rural India",
      description:
        "Over 500 orphaned children in India now have access to quality schooling through a new education initiative.",
      image: img2,
      date: "Sept 15, 2025",
      source: "Save the Children",
    },
    {
      id: 3,
      title: "Healthcare Outreach Expands in Africa",
      description:
        "Mobile clinics are providing life-saving vaccinations and mental health support to orphaned children across Africa.",
      image: img3,
      date: "Sept 12, 2025",
      source: "WHO",
    },
    {
      id: 4,
      title: "Safe Shelters Built for Syrian Refugee Children",
      description:
        "New shelters are being constructed in refugee camps to ensure children have a safe place to live and grow.",
      image: img6,
      date: "Sept 5, 2025",
      source: "Red Cross",
    },
    {
      id: 5,
      title: "Mental Health Programs for Orphans in Europe",
      description:
        "Counseling and community support programs have been launched in Europe to help children deal with trauma and loss.",
      image: img7,
      date: "Aug 29, 2025",
      source: "UNHCR",
    },
    {
      id: 6,
      title: "Tech Donations Bring Digital Learning to Orphanages",
      description:
        "Laptops and tablets have been donated to orphanages, enabling children to access modern digital education tools.",
      image: img8,
      date: "Aug 21, 2025",
      source: "World Vision",
    },
  ];

  return (
    <div className="news-page">
      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-hero-content">
          <h1>Global News on Children & Orphanages</h1>
          <p>
            Stay informed about the latest events, challenges, and progress
            affecting orphaned and vulnerable children around the world.
          </p>
        </div>
      </section>

      {/* News Articles Section */}
      <section className="news-list container">
        {newsArticles.map((article) => (
          <div key={article.id} className="news-card">
            <div className="news-image">
              <img src={article.image} alt={article.title} />
              <div className="news-overlay">
                <span className="news-source">{article.source}</span>
              </div>
            </div>
            <div className="news-card-content">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <div className="news-meta">
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default News;
