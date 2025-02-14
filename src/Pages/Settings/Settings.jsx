import React, { useState, useEffect } from "react";
import "./Settings.scss";

const Settings = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch("https://backl-main.vercel.app/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Account Preferences</h3>
        <p>Language: {settings?.account_preferences?.language || "Loading..."}</p>
        <p>Content Language: {settings?.account_preferences?.content_language || "Loading..."}</p>
      </div>

      <div className="settings-section">
        <h3>Manage Account</h3>
        <p>{settings?.manage_account?.privacy || "Loading..."}</p>
      </div>

      <div className="settings-section">
        <h3>Sign In & Security</h3>
        <p>Password: {settings?.sign_in_security?.password || "Loading..."}</p>
      </div>
    </div>
  );
};

export default Settings;
