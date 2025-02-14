import React, { useEffect, useState } from "react";
import "./Settings.scss";

const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch("https://backl-main.vercel.app/settings.json") // Fetching JSON from backend
      .then((response) => response.json())
      .then((data) => setSettings(data.settings))
      .catch((error) => console.error("Error fetching settings:", error));
  }, []);

  if (!settings) return <div className="loading">Loading...</div>;

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Settings</h2>
        <ul>
          <li><a href="#account">Account</a></li>
          <li><a href="#manage">Manage</a></li>
          <li><a href="#security">Sign In & Security</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="settings-content">
        {Object.keys(settings).map((key) => (
          <div key={key} id={key} className="settings-section">
            <h3>{settings[key].title}</h3>
            <p>{settings[key].description}</p>
            <div className="settings-options">
              {settings[key].sections.map((item, index) => (
                <div key={index} className="settings-item">
                  <span className="setting-name">{item.name}</span>
                  <span className="setting-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
