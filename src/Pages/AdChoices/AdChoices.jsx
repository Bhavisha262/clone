import React from "react";
import "./AdChoices.scss";

const AdChoices = () => {
  return (
    <div className="adchoices-page">
      <header className="adchoices-header">
        <div className="header-content">
          <h1>Ad Choices</h1>
          <p>Understand and control the ads you see on LinkedIn.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <main className="adchoices-content">
        <section className="section">
          <h2>What is AdChoices?</h2>
          <p>
            LinkedIn participates in self-regulatory advertising programs to
            give you control over personalized ads.
          </p>
        </section>

        <section className="section">
          <h2>How does LinkedIn use AdChoices?</h2>
          <p>
            LinkedIn follows industry guidelines and provides options to manage
            interest-based advertising preferences.
          </p>
        </section>

        <section className="section">
          <h2>How to opt out?</h2>
          <p>
            You can adjust your ad preferences in LinkedIn’s settings or visit{" "}
            <a
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              optout.aboutads.info
            </a>{" "}
            to manage choices across platforms.
          </p>
        </section>

        <section className="section">
          <h2>Learn more</h2>
          <p>
            For more details on LinkedIn’s advertising policies, visit our{" "}
            <a
              href="https://www.linkedin.com/help/linkedin/answer/62931"
              target="_blank"
              rel="noopener noreferrer"
            >
              Help Center
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

export default AdChoices;
