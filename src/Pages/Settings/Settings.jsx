import React, { useState, useEffect } from "react";
import "./Settings.scss";

const Settings = () => {
  const [selectedCategory, setSelectedCategory] = useState("account-preferences");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
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

  const subCategories = {
    "account-preferences": [
      { id: "profile-information", name: "Profile Information" },
      { id: "display", name: "Display" },
      { id: "account-management", name: "Account Management" },
      { id: "general-preferences", name: "General Preferences" },
    ],
  };

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <div className="settings-sidebar">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`sidebar-item ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(category.id);
              setSelectedSubCategory(null);
            }}
          >
            {category.name}
          </div>
        ))}

        {/* Show Subcategories if Account Preferences is Selected */}
        {selectedCategory === "account-preferences" && (
          <div className="settings-sub-sidebar">
            {subCategories[selectedCategory].map((sub) => (
              <div
                key={sub.id}
                className={`sub-sidebar-item ${selectedSubCategory === sub.id ? "active" : ""}`}
                onClick={() => setSelectedSubCategory(sub.id)}
              >
                {sub.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="settings-content">
        {settingsData ? (
          <>
            <h2>{selectedSubCategory 
                ? settingsData[selectedCategory]?.subSections[selectedSubCategory]?.title 
                : settingsData[selectedCategory]?.title || "Settings"}
            </h2>
            <p>{selectedSubCategory 
                ? settingsData[selectedCategory]?.subSections[selectedSubCategory]?.description 
                : settingsData[selectedCategory]?.description}
            </p>
            <ul>
              {(selectedSubCategory 
                ? settingsData[selectedCategory]?.subSections[selectedSubCategory]?.options 
                : settingsData[selectedCategory]?.options
              )?.map((option, index) => (
                <li key={index} className="setting-item">
                  <strong>{option.name}</strong>
                  <p>{option.description}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="loading">Loading settings...</div>
        )}
      </div>
    </div>
  );
};

export default Settings;
