function About() {
  return (
    <div className="about">
      <h1>About Golden Heart Orphanage</h1>
      <p>Founded in [year], we are dedicated to...</p>
      <section className="team">
        <h2>Our Team</h2>
        <Card title="Jane Doe" description="Founder" image="/assets/team1.jpg" />
        <Card title="John Smith" description="Director" image="/assets/team2.jpg" />
      </section>
    </div>
  );
}
export default About;