// Jobs.jsx
import React, { useState, useEffect } from 'react';
import './Jobs.scss';

const Jobs = () => {
  const [jobsData, setJobsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs data from the dummy backend API
  useEffect(() => {
    fetch('https://backl-main.vercel.app/api/jobs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setJobsData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="jobs-page loading">
        <div className="spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-page error">
        <p>Error loading jobs: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <header className="jobs-header">
        <h1>Jobs</h1>
      </header>

      <section className="saved-jobs">
        <h2>Saved Jobs</h2>
        <div className="job-cards">
          {jobsData.savedJobs && jobsData.savedJobs.length > 0 ? (
            jobsData.savedJobs.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>
                  {job.company} - {job.location}
                </p>
                <button className="apply-btn">Apply</button>
              </div>
            ))
          ) : (
            <p>No saved jobs.</p>
          )}
        </div>
      </section>

      <section className="my-jobs">
        <h2>My Jobs</h2>
        {jobsData.myJobs && jobsData.myJobs.length > 0 ? (
          jobsData.myJobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>
                {job.company} - {job.location}
              </p>
              <button className="view-btn">View Details</button>
            </div>
          ))
        ) : (
          <p>You haven't applied to any jobs yet.</p>
        )}
      </section>

      <section className="interview-prep">
        <h2>Interview Preparation</h2>
        {jobsData.interviewPrep ? (
          <div className="prep-card">
            <p>{jobsData.interviewPrep.tips}</p>
            <button className="learn-btn">Learn More</button>
          </div>
        ) : (
          <p>No tips available at the moment.</p>
        )}
      </section>

      <section className="top-job-picks">
        <h2>Top Job Picks For You</h2>
        <div className="job-cards">
          {jobsData.topJobPicks && jobsData.topJobPicks.length > 0 ? (
            jobsData.topJobPicks.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>
                  {job.company} - {job.location}
                </p>
                <button className="apply-btn">Apply</button>
              </div>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </section>

      <section className="recent-searches">
        <h2>Recent Job Searches</h2>
        <ul>
          {jobsData.recentJobSearches && jobsData.recentJobSearches.length > 0 ? (
            jobsData.recentJobSearches.map((search, index) => (
              <li key={index}>{search}</li>
            ))
          ) : (
            <li>No recent searches.</li>
          )}
        </ul>
      </section>

      <section className="premium-hiring">
        <h2>Try Premium Hiring in Your Network</h2>
        {jobsData.premiumHiring ? (
          <div className="premium-card">
            <p>{jobsData.premiumHiring.description}</p>
            <button className="upgrade-btn">Upgrade Now</button>
          </div>
        ) : (
          <p>Explore premium hiring options.</p>
        )}
      </section>

      <section className="more-jobs">
        <h2>More Jobs For You</h2>
        <div className="job-cards">
          {jobsData.moreJobs && jobsData.moreJobs.length > 0 ? (
            jobsData.moreJobs.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>
                  {job.company} - {job.location}
                </p>
                <button className="apply-btn">Apply</button>
              </div>
            ))
          ) : (
            <p>No more jobs available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
