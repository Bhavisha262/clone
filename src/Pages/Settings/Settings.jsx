import React, { useState, useEffect } from "react";
import "./Settings.scss";

const Settings = () => {
  const [selectedCategory, setSelectedCategory] = useState("account-preferences");
  const [selectedSubCategory, setSelectedSubCategory] = useState("profile-information");
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    industry: "",
    personalInfo: "",
    verifications: [],
  });
  const [darkMode, setDarkMode] = useState("default"); // darkMode can be "default", "on", or "off"

  // New state for General Preferences
  const [generalPrefs, setGeneralPrefs] = useState({
    language: "English",
    contentLanguage: "English",
    autoplayVideos: "default",
    soundEffects: "default",
    showProfilePhotos: true,
    showPreferredView: true,
    peopleYouUnfollowed: false,
  });

  // Sample profile data to fill in if API returns nothing
  const sampleProfileData = {
    name: "John Doe",
    location: "San Francisco, CA",
    industry: "Technology",
    personalInfo: "Experienced software engineer with a passion for building scalable web applications.",
    verifications: ["Email Verified", "Phone Verified"],
  };

  useEffect(() => {
    // Attempt to fetch real data; if that fails, use sample data.
    fetch("https://backl-main.vercel.app/api/user-profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setProfileData(data);
          setFormData({
            name: data.name || "",
            location: data.location || "",
            industry: data.industry || "",
            personalInfo: data.personalInfo || "",
            verifications: data.verifications || [],
          });
        } else {
          setProfileData(sampleProfileData);
          setFormData(sampleProfileData);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile info:", error);
        setProfileData(sampleProfileData);
        setFormData(sampleProfileData);
      });
  }, []);

  useEffect(() => {
    // Update dark mode class on body based on darkMode state
    if (darkMode === "on") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch("https://backl-main.vercel.app/api/user-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          // If the PUT fails, simulate the update by returning formData
          return formData;
        }
        return res.json();
      })
      .then((updatedData) => {
        setProfileData(updatedData);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Simulate update on error
        setProfileData(formData);
        setEditMode(false);
      });
  };

  // New handler for General Preferences changes
  const handleGeneralPrefsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralPrefs({
      ...generalPrefs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <div
          className={`sidebar-item ${selectedCategory === "account-preferences" ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory("account-preferences");
            // Set a default subcategory when switching back to account preferences
            setSelectedSubCategory("profile-information");
          }}
        >
          Account Preferences
        </div>
        {selectedCategory === "account-preferences" && (
          <div className="settings-sub-sidebar">
            <div
              className={`sub-sidebar-item ${selectedSubCategory === "profile-information" ? "active" : ""}`}
              onClick={() => setSelectedSubCategory("profile-information")}
            >
              Profile Information
            </div>
            <div
              className={`sub-sidebar-item ${selectedSubCategory === "display" ? "active" : ""}`}
              onClick={() => setSelectedSubCategory("display")}
            >
              Display
            </div>
            <div
              className={`sub-sidebar-item ${selectedSubCategory === "general-preferences" ? "active" : ""}`}
              onClick={() => setSelectedSubCategory("general-preferences")}
            >
              General Preferences
            </div>
          </div>
        )}
      </div>

      <div className="settings-content">
        {selectedSubCategory === "profile-information" && (
          <>
            <h2>Profile Information</h2>
            {profileData ? (
              <div className="profile-info">
                {!editMode ? (
                  <>
                    <p>
                      <strong>Name:</strong> {profileData.name}
                    </p>
                    <p>
                      <strong>Location:</strong> {profileData.location}
                    </p>
                    <p>
                      <strong>Industry:</strong> {profileData.industry}
                    </p>
                    <p>
                      <strong>Personal Information:</strong> {profileData.personalInfo}
                    </p>
                    <p>
                      <strong>Verifications:</strong>{" "}
                      {profileData.verifications && profileData.verifications.length > 0
                        ? profileData.verifications.join(", ")
                        : "No verifications available"}
                    </p>
                    <button className="edit-btn" onClick={() => setEditMode(true)}>
                      Edit
                    </button>
                  </>
                ) : (
                  <>
                    <label>
                      Name:
                      <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                      Location:
                      <input type="text" name="location" value={formData.location} onChange={handleChange} />
                    </label>
                    <label>
                      Industry:
                      <input type="text" name="industry" value={formData.industry} onChange={handleChange} />
                    </label>
                    <label>
                      Personal Information:
                      <textarea name="personalInfo" value={formData.personalInfo} onChange={handleChange}></textarea>
                    </label>
                    <div className="button-group">
                      <button className="save-btn" onClick={handleSave}>
                        Save
                      </button>
                      <button className="cancel-btn" onClick={() => setEditMode(false)}>
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="loading">Loading profile...</div>
            )}
          </>
        )}

        {selectedSubCategory === "display" && (
          <div className="display-settings">
            <h2>Display Settings</h2>
            <p>Select your Dark Mode preference:</p>
            <div className="dark-mode-options">
              <button
                className={`dark-mode-btn ${darkMode === "default" ? "active" : ""}`}
                onClick={() => setDarkMode("default")}
              >
                Default
              </button>
              <button
                className={`dark-mode-btn ${darkMode === "on" ? "active" : ""}`}
                onClick={() => setDarkMode("on")}
              >
                On
              </button>
              <button
                className={`dark-mode-btn ${darkMode === "off" ? "active" : ""}`}
                onClick={() => setDarkMode("off")}
              >
                Off
              </button>
            </div>
          </div>
        )}

        {selectedSubCategory === "general-preferences" && (
          <div className="general-preferences-settings">
            <h2>General Preferences</h2>
            <form>
              <label>
                Language:
                <select name="language" value={generalPrefs.language} onChange={handleGeneralPrefsChange}>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </label>
              <label>
                Content Language:
                <select
                  name="contentLanguage"
                  value={generalPrefs.contentLanguage}
                  onChange={handleGeneralPrefsChange}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </label>
              <label>
                Autoplay Videos:
                <select name="autoplayVideos" value={generalPrefs.autoplayVideos} onChange={handleGeneralPrefsChange}>
                  <option value="default">Default</option>
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </label>
              <label>
                Sound Effects:
                <select name="soundEffects" value={generalPrefs.soundEffects} onChange={handleGeneralPrefsChange}>
                  <option value="default">Default</option>
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </label>
              <label>
                Showing Profile Photos:
                <input
                  type="checkbox"
                  name="showProfilePhotos"
                  checked={generalPrefs.showProfilePhotos}
                  onChange={handleGeneralPrefsChange}
                />
              </label>
              <label>
                Showing Preferred View:
                <input
                  type="checkbox"
                  name="showPreferredView"
                  checked={generalPrefs.showPreferredView}
                  onChange={handleGeneralPrefsChange}
                />
              </label>
              <label>
                People You Unfollowed:
                <input
                  type="checkbox"
                  name="peopleYouUnfollowed"
                  checked={generalPrefs.peopleYouUnfollowed}
                  onChange={handleGeneralPrefsChange}
                />
              </label>
              <div className="button-group">
                <button
                  type="button"
                  className="save-btn"
                  onClick={() => {
                    // Simulate saving general preferences (e.g., send to backend)
                    console.log("General preferences saved", generalPrefs);
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
