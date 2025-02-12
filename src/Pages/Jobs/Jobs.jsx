import React, { useState, useEffect } from 'react';
import './Jobs.scss';

const Jobs = () => {
  const [jobsData, setJobsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state variables
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Snackbar state variables
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

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

  // Auto-hide the snackbar after 3 seconds
  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  // Button click handlers
  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
    setSnackbarMessage('Opening application form...');
    setShowSnackbar(true);
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowDetailsModal(true);
    setSnackbarMessage('Displaying job details...');
    setShowSnackbar(true);
  };

  const handleLearnMore = () => {
    setShowLearnMoreModal(true);
    setSnackbarMessage('Opening interview preparation tips...');
    setShowSnackbar(true);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
    setSnackbarMessage('Opening upgrade options...');
    setShowSnackbar(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Here you could add logic to process the application form data
    setShowApplyModal(false);
    setSnackbarMessage('Application submitted successfully!');
    setShowSnackbar(true);
  };

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
                <button className="apply-btn" onClick={() => handleApply(job)}>
                  Apply
                </button>
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
              <button className="view-btn" onClick={() => handleViewDetails(job)}>
                View Details
              </button>
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
            <button className="learn-btn" onClick={handleLearnMore}>
              Learn More
            </button>
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
                <button className="apply-btn" onClick={() => handleApply(job)}>
                  Apply
                </button>
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
            <button className="upgrade-btn" onClick={handleUpgrade}>
              Upgrade Now
            </button>
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
                <button className="apply-btn" onClick={() => handleApply(job)}>
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p>No more jobs available.</p>
          )}
        </div>
      </section>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Apply for {selectedJob ? selectedJob.title : 'Job'}</h2>
            <form onSubmit={handleSubmitApplication}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Cover Letter" required></textarea>
              <button type="submit">Submit Application</button>
            </form>
            <button onClick={() => setShowApplyModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Job Details Modal */}
      {showDetailsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedJob ? selectedJob.title : 'Job'} Details</h2>
            <p>
              <strong>Company:</strong> {selectedJob ? selectedJob.company : ''}
            </p>
            <p>
              <strong>Location:</strong> {selectedJob ? selectedJob.location : ''}
            </p>
            <p>
              <strong>Description:</strong>{' '}
              {selectedJob && selectedJob.description
                ? selectedJob.description
                : 'No description available.'}
            </p>
            <button onClick={() => setShowDetailsModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Learn More Modal */}
      {showLearnMoreModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Interview Preparation Tips</h2>
            <p>
              {jobsData.interviewPrep
                ? jobsData.interviewPrep.tips
                : 'No tips available.'}
            </p>
            <button onClick={() => setShowLearnMoreModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Upgrade to Premium Hiring</h2>
            <p>
              {jobsData.premiumHiring
                ? jobsData.premiumHiring.description
                : 'No information available.'}
            </p>
            <button onClick={() => setShowUpgradeModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Snackbar Notification */}
      {showSnackbar && (
        <div className="snackbar">
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};

export default Jobs;
