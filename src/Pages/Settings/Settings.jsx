import React, { useState, useEffect } from "react";
import "./Settings.scss";

const Settings = () => {
  const [selectedCategory, setSelectedCategory] = useState("account-preferences");
  const [selectedSection, setSelectedSection] = useState(null);
  const [settingsData, setSettingsData] = useState(null);

  useEffect(() => {
    fetch("https://backl-main.vercel.app/api/settings")
      .then((res) => res.json())
      .then((data) => setSettingsData(data))
      .catch((error) => console.error("Error fetching settings:", error));
  }, []);

  const categories = [
    { id: "account-preferences", name: "Account Preferences" },
    { id: "sign-in-security", name: "Sign In & Security" },
    { id: "visibility", name: "Visibility" },
    { id: "data-privacy", name: "Data Privacy" },
    { id: "job-seeking-preferences", name: "Job Seeking Preferences" },
    { id: "advertising-data", name: "Advertising Data" },
    { id: "network", name: "Network" },
  ];

  return (
    <div className="settings-container">
      {/* Sidebar with main categories */}
      <div className="settings-sidebar">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`sidebar-item ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(category.id);
              setSelectedSection(null); // Reset sub-section when switching main category
            }}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="settings-content">
        {settingsData ? (
          <>
            <h2>{settingsData[selectedCategory]?.title || "Settings"}</h2>
            <p>{settingsData[selectedCategory]?.description}</p>

            {/* If Account Preferences, show its sub-sections */}
            {selectedCategory === "account-preferences" && (
              <ul className="sub-section-list">
                {Object.keys(settingsData[selectedCategory]?.sections || {}).map((sectionKey) => (
                  <li
                    key={sectionKey}
                    className={`sub-section-item ${selectedSection === sectionKey ? "active" : ""}`}
                    onClick={() => setSelectedSection(sectionKey)}
                  >
                    {settingsData[selectedCategory].sections[sectionKey].title}
                  </li>
                ))}
              </ul>
            )}

            {/* Display the content of the selected sub-section */}
            {selectedSection && selectedCategory === "account-preferences" ? (
              <div className="sub-section-content">
                <h3>{settingsData[selectedCategory].sections[selectedSection]?.title}</h3>
                <ul>
                  {settingsData[selectedCategory].sections[selectedSection]?.options.map((option, index) => (
                    <li key={index} className="setting-item">
                      <strong>{option.name}</strong>
                      <p>{option.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // If no sub-section is selected, show the default category content
              <ul>
                {settingsData[selectedCategory]?.options?.map((option, index) => (
                  <li key={index} className="setting-item">
                    <strong>{option.name}</strong>
                    <p>{option.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="loading">Loading settings...</div>
        )}
      </div>
    </div>
  );
};

export default Settings;
