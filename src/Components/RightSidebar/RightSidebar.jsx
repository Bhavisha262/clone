import React, { useState } from 'react';
import {FaBriefcase, FaAd } from 'react-icons/fa';
import './RightSidebar.scss';

const RightSidebar = () => {
  const [trendingNews] = useState([
    "New trends in AI: What’s next?",
    "5 Tips for advancing your career in 2025",
    "How remote work is reshaping industries",
    "The future of cryptocurrency and blockchain",
    "Leadership skills for the new generation of managers",
  ]);

  const [jobSuggestions] = useState([
    "Software Engineer - Google",
    "Product Manager - Microsoft",
    "Data Scientist - Facebook",
    "UX Designer - Apple",
    "DevOps Engineer - Amazon",
  ]);

  const [ads] = useState([
    "Become a Certified Full Stack Developer",
    "Exclusive Offer: 50% Off on Online Courses",
    "Looking for Top Talent? Post Jobs on LinkedIn",
    "Upgrade Your Skills with LinkedIn Learning",
    "Get Your Profile Noticed by Top Recruiters",
  ]);

  return (
    <div className="right-sidebar">
      <div className="sidebar-section trending-news">
        <h3>Trending News</h3>
        <ul>
          {trendingNews.map((news, index) => (
            <li key={index} className="news-item">
              {news}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section job-suggestions">
        <h3>Job Suggestions</h3>
        <ul>
          {jobSuggestions.map((job, index) => (
            <li key={index} className="job-item">
              <FaBriefcase className="icon" /> {job}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section ads">
        <h3>Sponsored Ads</h3>
        <ul>
          {ads.map((ad, index) => (
            <li key={index} className="ad-item">
              <FaAd className="icon" /> {ad}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
