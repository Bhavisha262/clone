import React from "react";
import "./AudienceInsights.scss";

const AudienceInsights = () => {
  return (
    <div className="audience-insights-page">
      <header className="audience-insights-header">
        <div className="header-content">
          <h1>Audience Insights</h1>
          <p>Unlock deep insights about your target audience to drive better marketing decisions.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <main className="audience-insights-content">
        <section className="section">
          <h2>Overview</h2>
          <p>
            Discover who your audience is. Our Audience Insights tool provides you with detailed demographic data, professional backgrounds, and industry trends to help you better understand your market.
          </p>
        </section>

        <section className="section">
          <h2>Demographic Analysis</h2>
          <p>
            Explore age, gender, location, and job function breakdowns so you can tailor your messaging and strategy for maximum impact.
          </p>
        </section>

        <section className="section">
          <h2>Behavior & Engagement</h2>
          <p>
            Analyze user engagement and behavior patterns to identify which content resonates best with your audience, and optimize your campaigns accordingly.
          </p>
        </section>

        <section className="section">
          <h2>Actionable Insights</h2>
          <p>
            Leverage the insights you gain to refine your targeting, improve your creative strategy, and drive higher ROI on your marketing efforts.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AudienceInsights;
