import React, { useState, useEffect } from "react";
import "./Settings.scss";

const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch("https://backl-main.vercel.app/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  if (!settings) return <div className="loading">Loading settings...</div>;

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="section">
        <h3>Account</h3>
        <p><strong>Name:</strong> {settings.account.name}</p>
        <p><strong>Email:</strong> {settings.account.email}</p>
        <p><strong>Phone:</strong> {settings.account.phone}</p>
        <p><strong>Language:</strong> {settings.account.language}</p>
        <p><strong>Region:</strong> {settings.account.region}</p>
      </div>

      <div className="section">
        <h3>Privacy</h3>
        <p><strong>Profile Visibility:</strong> {settings.privacy.profileVisibility}</p>
        <p><strong>Email Visibility:</strong> {settings.privacy.emailVisibility}</p>
        <p><strong>Phone Visibility:</strong> {settings.privacy.phoneVisibility}</p>
      </div>

      <div className="section">
        <h3>Ads</h3>
        <p><strong>Ad Preferences:</strong> {settings.ads.adPreferences}</p>
        <p><strong>Data Sharing:</strong> {settings.ads.dataSharing ? "Enabled" : "Disabled"}</p>
      </div>

      <div className="section">
        <h3>Communications</h3>
        <p><strong>Email Notifications:</strong> {settings.communications.emailNotifications ? "On" : "Off"}</p>
        <p><strong>Push Notifications:</strong> {settings.communications.pushNotifications ? "On" : "Off"}</p>
      </div>

      <div className="section">
        <h3>Visibility</h3>
        <p><strong>Active Status:</strong> {settings.visibility.activeStatus}</p>
        <p><strong>Last Seen:</strong> {settings.visibility.lastSeen}</p>
      </div>

      <div className="section">
        <h3>Data</h3>
        <p><strong>Download Data:</strong> {settings.data.downloadData}</p>
      </div>
    </div>
  );
};

export default Settings;
