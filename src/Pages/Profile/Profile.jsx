import React, { useState, useEffect } from 'react';
import './Profile.scss';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data from the API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://backl-main.vercel.app/api/profile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        // Optional: log the response to check its structure
        console.log('Fetched profile data:', json);
        setData(json);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Guard conditions to prevent runtime errors
  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">Error loading profile data.</div>;
  if (!data || !data.profile) return <div className="error">No profile data available.</div>;

  // Destructure the data for convenience
  const {
    profile,
    about,
    experience,
    education,
    courses,
    suggestions,
    analytics,
    skills,
    interests,
    activity,
  } = data;

  return (
    <div className="profile-page">
      {/* Header Section */}
      <header className="profile-header">
        <div className="background-photo">
          <img src={profile.backgroundPhoto} alt="Background" />
        </div>
        <div className="profile-card">
          <div className="profile-photo">
            <img src={profile.profilePhoto} alt="Profile" />
          </div>
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <h2>{profile.headline}</h2>
            <p className="current-position">{profile.currentPosition}</p>
            <p className="education">{profile.education}</p>
            <p className="location">{profile.location}</p>
            {profile.website && (
              <p className="website">
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  {profile.website}
                </a>
              </p>
            )}
            <p className="connections">{profile.connections} connections</p>
            <p className="open-to">{profile.openTo}</p>
            {profile.languages && (
              <p className="languages">Languages: {profile.languages.join(', ')}</p>
            )}
            {profile.profileUrl && (
              <p className="profile-url">
                Profile URL:{' '}
                <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                  {profile.profileUrl}
                </a>
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="profile-content">
        <section className="left-column">
          <div className="card about-card">
            <h3>About</h3>
            <p>{about}</p>
          </div>
          <div className="card experience-card">
            <h3>Experience</h3>
            {experience &&
              experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h4>
                    {exp.title} at {exp.company}
                  </h4>
                  <span className="duration">{exp.duration}</span>
                  <p className="description">{exp.description}</p>
                </div>
              ))}
          </div>
          <div className="card education-card">
            <h3>Education</h3>
            {education &&
              education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h4>{edu.degree}</h4>
                  <p>
                    {edu.institution} ({edu.duration})
                  </p>
                </div>
              ))}
          </div>
          <div className="card courses-card">
            <h3>Courses</h3>
            <ul>
              {courses &&
                courses.map((course, index) => <li key={index}>{course}</li>)}
            </ul>
          </div>
        </section>
        <aside className="right-column">
          <div className="card suggestions-card">
            <h3>Suggested for You</h3>
            {suggestions &&
              suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <img src={suggestion.profilePhoto} alt={suggestion.name} />
                  <div className="suggestion-info">
                    <h4>{suggestion.name}</h4>
                    <p>{suggestion.headline}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="card analytics-card">
            <h3>Analytics</h3>
            {analytics && (
              <>
                <p>Profile Views: {analytics.profileViews}</p>
                <p>Post Views: {analytics.postViews}</p>
              </>
            )}
          </div>
          <div className="card skills-card">
            <h3>Skills</h3>
            <ul>
              {skills &&
                skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </div>
          <div className="card interests-card">
            <h3>Interests</h3>
            <ul>
              {interests &&
                interests.map((interest, index) => <li key={index}>{interest}</li>)}
            </ul>
          </div>
          <div className="card activity-card">
            <h3>Activity</h3>
            {activity &&
              activity.map((act, index) => (
                <div key={index} className="activity-item">
                  <strong>{act.type}:</strong> {act.content}
                </div>
              ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Profile;
