import React, { useState } from "react";
import "./AdChoices.scss";

const AdChoices = () => {
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className={`adchoices-page ${highContrast ? "high-contrast" : ""}`}>
      {/* Header Section */}
      <header className="adchoices-header">
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
        <div className="header-content">
          <h1>AdChoices</h1>
          <p>Learn how LinkedIn personalizes your ad experience</p>
        </div>
      </header>

      {/* Content Section */}
      <main className="adchoices-content">
        <section className="section">
          <h2>What is AdChoices?</h2>
          <p>LinkedIn uses the AdChoices program to provide transparency and control over your ad experience.</p>
        </section>

        <section className="section">
          <h2>How We Personalize Ads</h2>
          <p>We use your profile data, activity, and preferences to show relevant ads.</p>
        </section>

        <section className="section">
          <h2>Manage Your Ad Preferences</h2>
          <p>You can adjust your ad settings to control the types of ads you see on LinkedIn.</p>
        </section>

        {/* High Contrast Mode Toggle */}
        <section className="section">
          <h2>Accessibility Settings</h2>
          <label className="toggle-switch">
            <input
              type="checkbox"
              onChange={() => setHighContrast(!highContrast)}
            />
            <span className="slider"></span>
          </label>
          <p>Enable high contrast mode for better visibility.</p>
        </section>
      </main>
    </div>
  );
};

export default AdChoices;
