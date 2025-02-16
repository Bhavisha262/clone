import React, { useState, useEffect } from "react";
import "./Settings.scss";
import SignIn from "../SignIn/SignIn";
import SignOut from "../SignOut/SignOut";

const Settings = () => {
  // Top-level category: "account-preferences", "sign-in-security", "visibility", or "data-privacy"
  const [selectedCategory, setSelectedCategory] = useState("account-preferences");
  // For subcategories, the default for account-preferences is "profile-information",
  // for sign-in-security is "account-access", for visibility is "profile-network",
  // and for data-privacy we'll use "how-linkedin-uses-your-data"
  const [selectedSubCategory, setSelectedSubCategory] = useState("profile-information");

  // Existing state for Profile Information
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    industry: "",
    personalInfo: "",
    verifications: [],
  });
  const [darkMode, setDarkMode] = useState("default"); // "default", "on", or "off"

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

  // New state for Sign in & Security (Account Access) – sample data
  const sampleSignInData = {
    email: "john.doe@example.com",
    phone: "+1 123 456 7890",
    passkeys: ["Passkey1", "Passkey2"],
    signedInDevices: ["Chrome on Windows", "Safari on iPhone"],
    twoStepVerification: "Enabled",
  };
  const [signInData, setSignInData] = useState(sampleSignInData);

  // New state for Visibility settings (both subcategories)
  const [visibilitySettings, setVisibilitySettings] = useState({
    profileNetwork: {
      profileViewingOptions: "All LinkedIn members",
      nameAndHeadline: "All LinkedIn members",
      pageVisitVisibility: "On",
      publicProfile: "Editable",
      emailDownload: "Only you",
      connectionsVisibility: "On",
      membersFollowedVisibility: "Anyone on LinkedIn",
      lastNameVisibility: "Public",
      orgInterests: "On",
      pageOwnersExportingData: "Off",
      profileDiscoveryEmail: "1st degree connections",
      profileDiscoveryPhone: "Nobody",
      blocking: "None",
    },
    activity: {
      manageActiveStatus: "Your Connections only",
      shareProfileChanges: "On",
      notifyConnections: "On",
      mentionedByOthers: "On",
      followers: "Enabled",
    },
  });

  // New state for Data Privacy settings (for the new category)
  const [dataPrivacySettings, setDataPrivacySettings] = useState({
    usagePreference: "Standard",
    dataSharing: "On",
    personalizedAds: "On",
  });

  // Sample profile data to fill in if API returns nothing
  const sampleProfileData = {
    name: "John Doe",
    location: "San Francisco, CA",
    industry: "Technology",
    personalInfo:
      "Experienced software engineer with a passion for building scalable web applications.",
    verifications: ["Email Verified", "Phone Verified"],
  };

  useEffect(() => {
    // Attempt to fetch real profile data; if that fails, use sample data.
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
    // Update dark mode class on body based on darkMode state.
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
        setProfileData(formData);
        setEditMode(false);
      });
  };

  // Handler for changes in General Preferences.
  const handleGeneralPrefsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralPrefs({
      ...generalPrefs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handler for changes in Visibility settings.
  const handleVisibilityChange = (e, subcat) => {
    const { name, value } = e.target;
    setVisibilitySettings((prev) => ({
      ...prev,
      [subcat]: {
        ...prev[subcat],
        [name]: value,
      },
    }));
  };

  // Handler for changes in Data Privacy settings.
  const handleDataPrivacyChange = (e) => {
    const { name, value } = e.target;
    setDataPrivacySettings({
      ...dataPrivacySettings,
      [name]: value,
    });
  };

  // Handler for "Change Password" button.
  const handleChangePassword = () => {
    alert("Change Password functionality is not implemented in this demo.");
  };

  return (
    <>
    <div className="settings-container">
      <div className="settings-sidebar">
        {/* Top-level category: Account Preferences */}
        <div
          className={`sidebar-item ${selectedCategory === "account-preferences" ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory("account-preferences");
            setSelectedSubCategory("profile-information");
          }}
        >
          Account Preferences
        </div>
        {/* Top-level category: Sign in & Security */}
        <div
          className={`sidebar-item ${selectedCategory === "sign-in-security" ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory("sign-in-security");
            setSelectedSubCategory("account-access");
          }}
        >
          Sign in & Security
        </div>
        {/* Top-level category: Visibility */}
        <div
          className={`sidebar-item ${selectedCategory === "visibility" ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory("visibility");
            setSelectedSubCategory("profile-network");
          }}
        >
          Visibility
        </div>
        {/* Top-level category: Data Privacy */}
        <div
          className={`sidebar-item ${selectedCategory === "data-privacy" ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory("data-privacy");
            setSelectedSubCategory("how-linkedin-uses-your-data");
          }}
        >
          Data Privacy
        </div>

        {/* Sub-sidebar for Account Preferences */}
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

        {/* Sub-sidebar for Sign in & Security */}
        {selectedCategory === "sign-in-security" && (
          <div className="settings-sub-sidebar">
            <div
              className={`sub-sidebar-item ${selectedSubCategory === "account-access" ? "active" : ""}`}
              onClick={() => setSelectedSubCategory("account-access")}
            >
              Account Access
            </div>
          </div>
        )}

        {/* Sub-sidebar for Visibility */}
        {selectedCategory === "visibility" && (
          <div className="settings-sub-sidebar">
            <div
              className={`sub-sidebar-item ${selectedSubCategory === "profile-network" ? "active" : ""}`}
              onClick={() => setSelectedSubCategory("profile-network")}
            >
              Profile & Network
            </div>
            <div
              className={`sub-sidebar-item ${selectedSubCategory === "activity" ? "active" : ""}`}
              onClick={() => setSelectedSubCategory("activity")}
            >
              LinkedIn Activity
            </div>
          </div>
        )}

        {/* Sub-sidebar for Data Privacy */}
        {selectedCategory === "data-privacy" && (
          <div className="settings-sub-sidebar">
            <div
              className={`sub-sidebar-item ${
                selectedSubCategory === "how-linkedin-uses-your-data" ? "active" : ""
              }`}
              onClick={() => setSelectedSubCategory("how-linkedin-uses-your-data")}
            >
              How LinkedIn Uses Your Data
            </div>
          </div>
        )}
      </div>

      <div className="settings-content">
        {/* Account Preferences -> Profile Information */}
        {selectedCategory === "account-preferences" && selectedSubCategory === "profile-information" && (
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

        {/* Account Preferences -> Display */}
        {selectedCategory === "account-preferences" && selectedSubCategory === "display" && (
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

        {/* Account Preferences -> General Preferences */}
        {selectedCategory === "account-preferences" && selectedSubCategory === "general-preferences" && (
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
                <select name="contentLanguage" value={generalPrefs.contentLanguage} onChange={handleGeneralPrefsChange}>
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
                    console.log("General preferences saved", generalPrefs);
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sign in & Security -> Account Access */}
        {selectedCategory === "sign-in-security" && selectedSubCategory === "account-access" && (
          <div className="account-access-settings">
            <h2>Account Access</h2>
            <div className="field">
              <label>
                <strong>Email Address:</strong>
              </label>
              <input type="email" value={signInData.email} readOnly />
            </div>
            <div className="field">
              <label>
                <strong>Phone Number:</strong>
              </label>
              <input type="text" value={signInData.phone} readOnly />
            </div>
            <div className="field">
              <button className="change-password-btn" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
            <div className="field">
              <label>
                <strong>Passkeys:</strong>
              </label>
              <p>{signInData.passkeys.join(", ")}</p>
            </div>
            <div className="field">
              <label>
                <strong>Where You Are Signed In:</strong>
              </label>
              <p>{signInData.signedInDevices.join(", ")}</p>
            </div>
            <div className="field">
              <label>
                <strong>Two-Step Verification:</strong>
              </label>
              <p>{signInData.twoStepVerification}</p>
            </div>
          </div>
        )}

        {/* Visibility -> Profile & Network */}
        {selectedCategory === "visibility" && selectedSubCategory === "profile-network" && (
          <div className="visibility-profile-network-settings">
            <h2>Visibility of Your Profile & Network</h2>
            <form>
              <label>
                Profile Viewing Options:
                <select
                  name="profileViewingOptions"
                  value={visibilitySettings.profileNetwork.profileViewingOptions}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="All LinkedIn members">All LinkedIn members</option>
                  <option value="Only your connections">Only your connections</option>
                  <option value="Only you">Only you</option>
                </select>
              </label>
              <label>
                Your Name and Headline:
                <select
                  name="nameAndHeadline"
                  value={visibilitySettings.profileNetwork.nameAndHeadline}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="All LinkedIn members">All LinkedIn members</option>
                  <option value="Only your connections">Only your connections</option>
                  <option value="Only you">Only you</option>
                </select>
              </label>
              <label>
                Page Visit Visibility:
                <select
                  name="pageVisitVisibility"
                  value={visibilitySettings.profileNetwork.pageVisitVisibility}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </label>
              <label>
                Edit Your Public Profile:
                <select
                  name="publicProfile"
                  value={visibilitySettings.profileNetwork.publicProfile}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="Editable">Editable</option>
                  <option value="Not Editable">Not Editable</option>
                </select>
              </label>
              <label>
                Who Can See or Download Your Email Address:
                <select
                  name="emailDownload"
                  value={visibilitySettings.profileNetwork.emailDownload}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="Only you">Only you</option>
                  <option value="Your connections">Your connections</option>
                  <option value="Everyone">Everyone</option>
                </select>
              </label>
              <label>
                Who Can See Your Connections:
                <select
                  name="connectionsVisibility"
                  value={visibilitySettings.profileNetwork.connectionsVisibility}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </label>
              <label>
                Who Can See Members You Follow:
                <select
                  name="membersFollowedVisibility"
                  value={visibilitySettings.profileNetwork.membersFollowedVisibility}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="Anyone on LinkedIn">Anyone on LinkedIn</option>
                  <option value="Only your connections">Only your connections</option>
                </select>
              </label>
              <label>
                Who Can See Your Last Name:
                <select
                  name="lastNameVisibility"
                  value={visibilitySettings.profileNetwork.lastNameVisibility}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="Public">Public</option>
                  <option value="Only your connections">Only your connections</option>
                </select>
              </label>
              <label>
                Representing Your Organizations and Interests:
                <select
                  name="orgInterests"
                  value={visibilitySettings.profileNetwork.orgInterests}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </label>
              <label>
                Page Owners Exporting Your Data:
                <select
                  name="pageOwnersExportingData"
                  value={visibilitySettings.profileNetwork.pageOwnersExportingData}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="Off">Off</option>
                  <option value="On">On</option>
                </select>
              </label>
              <label>
                Profile Discovery Using Email Address:
                <select
                  name="profileDiscoveryEmail"
                  value={visibilitySettings.profileNetwork.profileDiscoveryEmail}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="1st degree connections">1st degree connections</option>
                  <option value="Only you">Only you</option>
                </select>
              </label>
              <label>
                Profile Discovery Using Phone Number:
                <select
                  name="profileDiscoveryPhone"
                  value={visibilitySettings.profileNetwork.profileDiscoveryPhone}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="Nobody">Nobody</option>
                  <option value="1st degree connections">1st degree connections</option>
                </select>
              </label>
              <label>
                Blocking:
                <select
                  name="blocking"
                  value={visibilitySettings.profileNetwork.blocking}
                  onChange={(e) => handleVisibilityChange(e, "profileNetwork")}
                >
                  <option value="None">None</option>
                  <option value="Some">Some</option>
                </select>
              </label>
              <div className="button-group">
                <button
                  type="button"
                  className="save-btn"
                  onClick={() => {
                    console.log("Visibility (Profile & Network) settings saved", visibilitySettings.profileNetwork);
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Visibility -> LinkedIn Activity */}
        {selectedCategory === "visibility" && selectedSubCategory === "activity" && (
          <div className="visibility-activity-settings">
            <h2>Visibility of Your LinkedIn Activity</h2>
            <form>
              <label>
                Manage Active Status:
                <select
                  name="manageActiveStatus"
                  value={visibilitySettings.activity.manageActiveStatus}
                  onChange={(e) => handleVisibilityChange(e, "activity")}
                >
                  <option value="Your Connections only">Your Connections only</option>
                  <option value="Everyone">Everyone</option>
                  <option value="No one">No one</option>
                </select>
              </label>
              <label>
                Share Job Changes, Education Changes, and Work Anniversaries:
                <select
                  name="shareProfileChanges"
                  value={visibilitySettings.activity.shareProfileChanges}
                  onChange={(e) => handleVisibilityChange(e, "activity")}
                >
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </label>
              <label>
                Notify Connections When You're in the News:
                <select
                  name="notifyConnections"
                  value={visibilitySettings.activity.notifyConnections}
                  onChange={(e) => handleVisibilityChange(e, "activity")}
                >
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </label>
              <label>
                Mentioned by Others:
                <select
                  name="mentionedByOthers"
                  value={visibilitySettings.activity.mentionedByOthers}
                  onChange={(e) => handleVisibilityChange(e, "activity")}
                >
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </label>
              <label>
                Followers:
                <select
                  name="followers"
                  value={visibilitySettings.activity.followers}
                  onChange={(e) => handleVisibilityChange(e, "activity")}
                >
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </label>
              <div className="button-group">
                <button
                  type="button"
                  className="save-btn"
                  onClick={() => {
                    console.log("Visibility (Activity) settings saved", visibilitySettings.activity);
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sign in & Security -> Account Access */}
        {selectedCategory === "sign-in-security" && selectedSubCategory === "account-access" && (
          <div className="account-access-settings">
            <h2>Account Access</h2>
            <div className="field">
              <label>
                <strong>Email Address:</strong>
              </label>
              <input type="email" value={signInData.email} readOnly />
            </div>
            <div className="field">
              <label>
                <strong>Phone Number:</strong>
              </label>
              <input type="text" value={signInData.phone} readOnly />
            </div>
            <div className="field">
              <button className="change-password-btn" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
            <div className="field">
              <label>
                <strong>Passkeys:</strong>
              </label>
              <p>{signInData.passkeys.join(", ")}</p>
            </div>
            <div className="field">
              <label>
                <strong>Where You Are Signed In:</strong>
              </label>
              <p>{signInData.signedInDevices.join(", ")}</p>
            </div>
            <div className="field">
              <label>
                <strong>Two-Step Verification:</strong>
              </label>
              <p>{signInData.twoStepVerification}</p>
            </div>
          </div>
        )}

        {/* Data Privacy -> How LinkedIn Uses Your Data */}
        {selectedCategory === "data-privacy" && selectedSubCategory === "how-linkedin-uses-your-data" && (
          <div className="data-privacy-settings">
            <h2>How LinkedIn Uses Your Data</h2>
            <form>
              <label>
                Data Usage Preference:
                <select
                  name="usagePreference"
                  value={dataPrivacySettings.usagePreference}
                  onChange={handleDataPrivacyChange}
                >
                  <option value="Standard">Standard</option>
                  <option value="Limited">Limited</option>
                </select>
              </label>
              <label>
                Data Sharing with Third Parties:
                <select
                  name="dataSharing"
                  value={dataPrivacySettings.dataSharing}
                  onChange={handleDataPrivacyChange}
                >
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </label>
              <label>
                Personalized Ads:
                <select
                  name="personalizedAds"
                  value={dataPrivacySettings.personalizedAds}
                  onChange={handleDataPrivacyChange}
                >
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </label>
              <div className="button-group">
                <button
                  type="button"
                  className="save-btn"
                  onClick={() => {
                    console.log("Data Privacy settings saved", dataPrivacySettings);
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
    <SignIn/>  
    </>
  );
};

export default Settings;
