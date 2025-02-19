import React, { useState } from "react";
import "./PrivacyTerms.scss";

const PrivacyTerms = () => {
  const [sections, setSections] = useState([
    {
      title: "Privacy Policy",
      content: "We collect and use your data to provide and improve our services. Your privacy is our priority.",
      open: false,
    },
    {
      title: "Terms of Service",
      content: "By using our platform, you agree to our terms and conditions, including data usage and security policies.",
      open: false,
    },
    {
      title: "Cookies Policy",
      content: "We use cookies to enhance user experience. You can manage your cookie settings in your browser.",
      open: false,
    },
    {
      title: "Data Protection",
      content: "We implement strong security measures to protect your personal information from unauthorized access.",
      open: false,
    },
  ]);

  const toggleSection = (index) => {
    setSections(
      sections.map((item, i) => ({
        ...item,
        open: i === index ? !item.open : false,
      }))
    );
  };

  return (
    <div className="privacy-terms-page">
      <header className="privacy-terms-header">
        <div className="header-content">
          <h1>Privacy & Terms</h1>
          <p>Understand how we handle your data and your rights as a user.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <div className="privacy-terms-content">
        <div className="section">
          <h2>Our Policies</h2>
          {sections.map((item, index) => (
            <div key={index} className={`policy-item ${item.open ? "open" : ""}`} onClick={() => toggleSection(index)}>
              <div className="policy-title">{item.title}</div>
              <div className="policy-content">{item.open && <p>{item.content}</p>}</div>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Need More Help?</h2>
          <p>For further assistance, please visit our Help Center.</p>
          <button className="help-btn">Visit Help Center</button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTerms;
