// Settings.jsx
import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Adjust the URL if your backend runs on a different port or domain
    fetch('https://backl-main.vercel.app/api/settings')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setSettings(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error fetching settings: {error}</div>;
  }

  if (!settings) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      {Object.keys(settings).map((key) => (
        <div key={key} className="settings-section">
          <h2>{settings[key].title}</h2>
          <p>{settings[key].description}</p>
          {settings[key].options && (
            <ul>
              {settings[key].options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Settings;
