import React, { useState } from "react";
import "./AdCenter.scss";
import { useNavigate } from "react-router-dom";

const AdCenter = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([
    {
      title: "Create Ad",
      content: "Set up targeted ads to reach professionals worldwide with LinkedIn Ads.",
      open: false,
    },
    {
      title: "Manage Ads",
      content: "View, edit, and optimize your ongoing ad campaigns to maximize reach and performance.",
      open: false,
    },
    {
      title: "Analytics & Insights",
      content: "Get real-time data on impressions, clicks, and conversions for your ad campaigns.",
      open: false,
    },
    {
      title: "Billing & Payments",
      content: "Manage your ad billing details, payments, and budget for advertising on LinkedIn.",
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
    <div className="ad-center-page">
      <header className="ad-center-header">
        <div className="header-content">
          <h1>LinkedIn Ad Center</h1>
          <p>Grow your business with powerful LinkedIn advertising solutions.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <div className="ad-center-content">
        <div className="section">
          <h2>Ad Management</h2>
          {sections.map((item, index) => (
            <div
              key={index}
              className={`ad-item ${item.open ? "open" : ""}`}
              onClick={() => toggleSection(index)}
            >
              <div className="ad-title">{item.title}</div>
              <div className="ad-content">{item.open && <p>{item.content}</p>}</div>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Need Help?</h2>
          <p>Learn more about LinkedIn Ads and how to optimize your campaigns.</p>
          <button className="help-btn" onClick={() => navigate("/help")}>
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCenter;
