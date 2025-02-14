import React, { useState, useEffect } from "react";
import "./Settings.scss";

const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch("https://backl-main.vercel.app/api/settings") // Fetching dummy API
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-section">
        <h3>Account Preferences</h3>
        <p>Language: {settings.account_preferences.language}</p>
        <p>Content Language: {settings.account_preferences.content_language}</p>
        <p>Dark Mode: {settings.account_preferences.dark_mode ? "On" : "Off"}</p>
        <p>Autoplay Videos: {settings.account_preferences.autoplay_videos ? "On" : "Off"}</p>
      </div>

      <div className="settings-section">
        <h3>Manage Account</h3>
        <p>{settings.manage_account.privacy}</p>
        <p>{settings.manage_account.ads}</p>
        <p>{settings.manage_account.communications}</p>
      </div>

      <div className="settings-section">
        <h3>Sign In & Security</h3>
        <p>Password: {settings.sign_in_security.password}</p>
        <p>Devices: {settings.sign_in_security.devices.join(", ")}</p>
        <p>Session History: {settings.sign_in_security.session_history.join(", ")}</p>
      </div>
    </div>
  );
};

export default Settings;
