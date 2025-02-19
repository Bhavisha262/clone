import React from "react";
import "./BusinessServices.scss";

const BusinessServices = () => {
  return (
    <div className="business-services-page">
      <header className="business-services-header">
        <div className="header-content">
          <h1>Business Services</h1>
          <p>Get the right tools to grow your business on LinkedIn.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <main className="business-services-content">
        <section className="section">
          <h2>LinkedIn Ads</h2>
          <p>
            Target professionals and decision-makers to grow your brand.{" "}
            <a
              href="https://business.linkedin.com/marketing-solutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
            .
          </p>
        </section>

        <section className="section">
          <h2>Talent Solutions</h2>
          <p>
            Find and hire top talent efficiently with LinkedIn Recruiter.{" "}
            <a
              href="https://business.linkedin.com/talent-solutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
            .
          </p>
        </section>

        <section className="section">
          <h2>Sales Solutions</h2>
          <p>
            Build relationships with decision-makers using LinkedIn Sales
            Navigator.{" "}
            <a
              href="https://business.linkedin.com/sales-solutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
            .
          </p>
        </section>

        <section className="section">
          <h2>Learning Solutions</h2>
          <p>
            Help your team grow with LinkedIn Learning’s professional courses.{" "}
            <a
              href="https://learning.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
            .
          </p>
        </section>

        <section className="section">
          <h2>Post a Job</h2>
          <p>
            Hire qualified candidates quickly by posting jobs on LinkedIn.{" "}
            <a
              href="https://www.linkedin.com/talent/post-a-job"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
            .
          </p>
        </section>

        <section className="section">
          <h2>LinkedIn Marketing Partners</h2>
          <p>
            Access expert marketing solutions through LinkedIn’s partner
            ecosystem.{" "}
            <a
              href="https://business.linkedin.com/marketing-solutions/partner-program"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

export default BusinessServices;
