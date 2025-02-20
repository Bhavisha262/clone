import React from "react";
import { useNavigate } from "react-router-dom";
import "./CampaignManager.scss";

const CampaignManager = () => {
  const navigate = useNavigate();

  const campaigns = [
    {
      title: "Campaign Alpha",
      description:
        "Active campaign targeting IT professionals with sponsored content.",
      status: "Active",
    },
    {
      title: "Campaign Beta",
      description:
        "Paused campaign targeting marketing executives via text ads.",
      status: "Paused",
    },
    {
      title: "Campaign Gamma",
      description:
        "Completed campaign focusing on Sales Solutions performance.",
      status: "Completed",
    },
  ];

  return (
    <div className="campaign-manager-page">
      <header className="campaign-manager-header">
        <div className="header-content">
          <h1>Campaign Manager</h1>
          <p>Monitor, manage, and optimize your LinkedIn ad campaigns.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <main className="campaign-manager-content">
        <section className="section">
          <h2>Active Campaigns</h2>
          {campaigns.map((campaign, index) => (
            <div key={index} className="campaign-item">
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>
              <span className={`campaign-status ${campaign.status.toLowerCase()}`}>
                {campaign.status}
              </span>
            </div>
          ))}
        </section>

        <section className="section">
          <h2>Create New Campaign</h2>
          <p>
            Ready to launch a new campaign? Click the button below to get started.
          </p>
          <button
            className="create-campaign-btn"
            onClick={() => navigate("/create-ad")}
          >
            Create Campaign
          </button>
        </section>
      </main>
    </div>
  );
};

export default CampaignManager;
