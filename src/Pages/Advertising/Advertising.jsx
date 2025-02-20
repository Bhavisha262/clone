import React from "react";
import { useNavigate } from "react-router-dom";
import "./Advertising.scss";

const Advertising = () => {
  const navigate = useNavigate();

  const adOptions = [
    {
      title: "Sponsored Content",
      description: "Create engaging content that appears in the LinkedIn feed.",
      buttonText: "Create Ad",
      path: "/createad",
    },
    {
      title: "Campaign Manager",
      description: "Manage and optimize your LinkedIn ad campaigns effectively.",
      buttonText: "Go to Manager",
      path: "/campaign-manager",
    },
    {
      title: "Audience Insights",
      description: "Analyze and understand your audience for better targeting.",
      buttonText: "View Insights",
      path: "/audience-insights",
    },
    {
      title: "Billing & Payments",
      description: "Manage your ad payments, billing details, and invoices.",
      buttonText: "Manage Billing",
      path: "/billing",
    },
  ];

  return (
    <div className="ad-center">
      <header className="ad-center-header">
        <div className="header-content">
          <h1>Advertisement Center</h1>
          <p>Promote your brand and connect with the right audience.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <div className="ad-options">
        {adOptions.map((option, index) => (
          <div key={index} className="ad-card">
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            <button className="ad-btn" onClick={() => navigate(option.path)}>
              {option.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertising;
