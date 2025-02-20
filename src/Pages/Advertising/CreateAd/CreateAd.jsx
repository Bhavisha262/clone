import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAd.scss";

const CreateAd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    campaignName: "",
    adFormat: "",
    targetAudience: "",
    budget: "",
    schedule: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process formData (e.g., call API)
    console.log("Ad Campaign Data:", formData);
    // Navigate to advertising overview after submission
    navigate("/advertising");
  };

  return (
    <div className="create-ad-page">
      <header className="create-ad-header">
        <div className="header-content">
          <h1>Create Ad</h1>
          <p>Set up a new campaign to promote your business on LinkedIn.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <main className="create-ad-content">
        <form className="create-ad-form" onSubmit={handleSubmit}>
          <section className="section">
            <h2>Campaign Details</h2>
            <label>
              Campaign Name:
              <input 
                type="text" 
                name="campaignName" 
                value={formData.campaignName} 
                onChange={handleChange}
                placeholder="Enter campaign name"
                required
              />
            </label>
            <label>
              Ad Format:
              <select 
                name="adFormat" 
                value={formData.adFormat} 
                onChange={handleChange}
                required
              >
                <option value="">Select format</option>
                <option value="sponsoredContent">Sponsored Content</option>
                <option value="textAds">Text Ads</option>
                <option value="videoAds">Video Ads</option>
              </select>
            </label>
          </section>

          <section className="section">
            <h2>Targeting & Budget</h2>
            <label>
              Target Audience:
              <input 
                type="text" 
                name="targetAudience" 
                value={formData.targetAudience} 
                onChange={handleChange}
                placeholder="e.g., Industry, location, job title"
                required
              />
            </label>
            <label>
              Budget ($):
              <input 
                type="number" 
                name="budget" 
                value={formData.budget} 
                onChange={handleChange}
                placeholder="Enter budget"
                required
              />
            </label>
            <label>
              Schedule (Start Date):
              <input 
                type="date" 
                name="schedule" 
                value={formData.schedule} 
                onChange={handleChange}
                required
              />
            </label>
          </section>

          <section className="section">
            <button type="submit" className="create-ad-btn">
              Create Campaign
            </button>
          </section>
        </form>
      </main>
    </div>
  );
};

export default CreateAd;
