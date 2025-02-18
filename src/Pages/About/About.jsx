import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <div className="header-content">
          <h1>About LinkedIn</h1>
          <p>Connecting professionals around the world</p>
        </div>
        {/* Floating shapes in the background */}
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>
      <main className="about-content">
        <section className="section">
          <h2>Our Mission</h2>
          <p>
            To connect the world’s professionals to make them more productive and successful.
          </p>
        </section>
        <section className="section">
          <h2>Our Vision</h2>
          <p>
            To create economic opportunity for every member of the global workforce.
          </p>
        </section>
        <section className="section">
          <h2>Our Values</h2>
          <p>
            We believe in transforming the way professionals connect, share, and learn from each other.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
