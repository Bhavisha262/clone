import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Settings.scss";

const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios.get("https://backl-main.vercel.app/settings") // Change this to your actual backend URL
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  if (!settings) {
    return <div className="settings">Loading...</div>;
  }

  return (
    <div className="settings">
      <h1>Settings</h1>

      {/* Account Preferences */}
      <section>
        <h2>Account Preferences</h2>
        <div>{settings.accountPreferences.profileInformation}</div>
        <div>{settings.accountPreferences.display}</div>
        <div>{settings.accountPreferences.accountManagement}</div>
        <div>{settings.accountPreferences.generalPreferences}</div>
      </section>

      {/* Sign-In & Security */}
      <section>
        <h2>Sign-In & Security</h2>
        <div>{settings.signInSecurity.accountAccess}</div>
        <div>{settings.signInSecurity.visibility}</div>
      </section>

      {/* Data Privacy */}
      <section>
        <h2>Data Privacy</h2>
        <div>{settings.dataPrivacy.howLinkedInUsesData}</div>
        <div>{settings.dataPrivacy.jobSeekingPreferences}</div>
      </section>

      {/* Advertising Data */}
      <section>
        <h2>Advertising Data</h2>
        <div>{settings.advertisingData.profileData}</div>
        <div>{settings.advertisingData.thirdPartyData}</div>
      </section>

      {/* Network */}
      <section>
        <h2>Network</h2>
        <div>{settings.network.manage}</div>
        <div>{settings.network.signInOut}</div>
      </section>
    </div>
  );
};

export default Settings;
