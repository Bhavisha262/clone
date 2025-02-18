import React, { useState } from "react";
import "./HelpCenter.scss";

const HelpCenter = () => {
  const [faq, setFaq] = useState([
    {
      question: "How do I reset my password?",
      answer: "Go to settings, click on 'Security', and select 'Change Password'.",
      open: false,
    },
    {
      question: "How do I delete my account?",
      answer: "Visit account settings, go to 'Manage Account', and select 'Close Account'.",
      open: false,
    },
    {
      question: "How do I report an issue?",
      answer: "Click on 'Help & Support', then select 'Report a Problem'.",
      open: false,
    },
    {
      question: "How can I contact support?",
      answer: "You can reach out via email at support@linkedclone.com.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaq(
      faq.map((item, i) => ({
        ...item,
        open: i === index ? !item.open : false,
      }))
    );
  };

  return (
    <div className="help-center-page">
      <header className="help-center-header">
        <div className="header-content">
          <h1>Help Center</h1>
          <p>Find answers to common questions or reach out for support.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <div className="help-center-content">
        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faq.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${item.open ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">{item.question}</div>
              <div className="faq-answer">{item.open && <p>{item.answer}</p>}</div>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Contact Support</h2>
          <p>If you need further assistance, feel free to contact us.</p>
          <button className="support-btn">Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
