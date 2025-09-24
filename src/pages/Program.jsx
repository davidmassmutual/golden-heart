import React from "react";
import "../styles/Program.css";
import { FaBook, FaHeartbeat, FaAppleAlt, FaHome, FaTools } from "react-icons/fa";

function Program () {
const programs = [
  {
    id: 1,
    title: "Education",
    icon: <FaBook />,
    description:
      "We provide schooling support, supplies, and learning opportunities to ensure every child has access to quality education.",
    goals: "Improve literacy rates, provide equal opportunities, and empower children through knowledge.",
    outcomes: "Over 1,500 children enrolled in schools and vocational classes each year.",
    donations: "Funds cover tuition fees, books, uniforms, teacher salaries, and building safe classrooms.",
  },
  {
    id: 2,
    title: "Healthcare",
    icon: <FaHeartbeat />,
    description:
      "Our medical programs ensure children receive regular check-ups, vaccinations, and mental health support.",
    goals: "Prevent disease, promote well-being, and provide emergency healthcare.",
    outcomes: "Thousands of children benefit from yearly mobile clinics and hospital partnerships.",
    donations: "Funds cover medicine, hospital visits, mobile clinics, and healthcare staff training.",
  },
  {
    id: 3,
    title: "Nutrition",
    icon: <FaAppleAlt />,
    description:
      "We provide daily nutritious meals to help children grow healthy and strong.",
    goals: "Eliminate hunger and malnutrition, and ensure every child has energy to learn and play.",
    outcomes: "Over 10,000 meals served annually across our orphanages.",
    donations: "Funds cover food supplies, clean water, and safe kitchen facilities.",
  },
  {
    id: 4,
    title: "Shelter",
    icon: <FaHome />,
    description:
      "Safe and loving housing where children can feel secure and grow in a family-like environment.",
    goals: "Provide stability, safety, and emotional support.",
    outcomes: "Hundreds of children now live in clean, safe, and loving homes.",
    donations: "Funds cover housing maintenance, utilities, bedding, and caregiving staff.",
  },
  {
    id: 5,
    title: "Vocational Training",
    icon: <FaTools />,
    description:
      "We equip older children with practical job skills to prepare them for independence.",
    goals: "Teach trades, digital skills, and entrepreneurship.",
    outcomes: "Dozens of graduates find stable jobs or start small businesses each year.",
    donations: "Funds cover training materials, workshops, and mentorship programs.",
  },
];
// };

  return (
    <div className="programs-page">
      {/* Hero Section */}
      <section className="programs-hero">
        <div className="overlay">
          <h1>Our Programs</h1>
          <p>
            Golden Heart Orphanage runs life-changing programs to support
            children’s education, health, nutrition, shelter, and future skills.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-list container">
        {programs.map((program) => (
          <div className="program-card" key={program.id}>
            <div className="program-icon">{program.icon}</div>
            <h2>{program.title}</h2>
            <p>{program.description}</p>
            <div className="program-details">
              <h4>🎯 Goals</h4>
              <p>{program.goals}</p>
              <h4>📈 Outcomes</h4>
              <p>{program.outcomes}</p>
              <h4>💰 How Donations Are Used</h4>
              <p>{program.donations}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Program;
