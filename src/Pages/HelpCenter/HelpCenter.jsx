import React, { useState } from "react";
import "./HelpCenter.scss";

const HelpCenter = () => {
  const [faq, setFaq] = useState([
    { question: "How do I reset my password?", answer: "Go to settings, click on 'Security', and select 'Change Password'.", open: false },
    { question: "How do I delete my account?", answer: "Visit account settings, go to 'Manage Account', and select 'Close Account'.", open: false },
    { question: "How do I report an issue?", answer: "Click on 'Help & Support', then select 'Report a Problem'.", open: false },
    { question: "How can I contact support?", answer: "You can reach out via email at support@linkedclone.com.", open: false },
  ]);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState("");

  const toggleFAQ = (index) => {
    setFaq(faq.map((item, i) => ({ ...item, open: i === index ? !item.open : false })));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required!";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://backl-main.vercel.app/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setSuccess("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setShowForm(false), 2000);
      } else {
        setErrors({ server: "Something went wrong. Please try again!" });
      }
    } catch (error) {
      setErrors({ server: "Server error. Please try again later!" });
    }
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
            <div key={index} className={`faq-item ${item.open ? "open" : ""}`} onClick={() => toggleFAQ(index)}>
              <div className="faq-question">{item.question}</div>
              <div className="faq-answer">{item.open && <p>{item.answer}</p>}</div>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Contact Support</h2>
          <p>If you need further assistance, feel free to contact us.</p>
          <button className="support-btn" onClick={() => setShowForm(true)}>Contact Us</button>
        </div>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowForm(false)}>&times;</span>
            <h2>Contact Support</h2>
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              {errors.name && <p className="error">{errors.name}</p>}

              <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              {errors.email && <p className="error">{errors.email}</p>}

              <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
              {errors.message && <p className="error">{errors.message}</p>}

              {errors.server && <p className="error">{errors.server}</p>}
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
