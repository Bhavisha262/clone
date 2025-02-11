import React, { useState, useEffect } from 'react';
import './Notifications.scss';

const TABS = ['All', 'Jobs', 'My Posts', 'Mentions'];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch notifications from the backend API
  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://backl-main.vercel.app/api/notifications');
      const data = await response.json();
      
      // If data is an array, set it directly, otherwise assume it's an object with notifications
      setNotifications(Array.isArray(data) ? data : data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]); // Ensure notifications is never undefined
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter notifications based on activeTab. (Assumes each notification has a "category" property)
  const filteredNotifications =
    activeTab === 'All'
      ? notifications
      : notifications.filter((n) => n.category === activeTab);

  return (
    <div className="notification-page">
      {/* Header Area */}
      <div className="header">
        <div className="profile-card">
          <img src="https://via.placeholder.com/50" alt="Profile" />
          <div className="profile-info">
            <h2>John Doe</h2>
            <p>Frontend Developer</p>
          </div>
        </div>
        <div className="manage-notifications-card">
          <button>Manage Your Notifications</button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs">
        {TABS.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
      {Array.isArray(filteredNotifications) && filteredNotifications.length > 0 ? (
  filteredNotifications.map((notification) => (

            <div key={notification.id} className="notification-item">
              <img
                src={notification.avatar || 'https://via.placeholder.com/40'}
                alt="Avatar"
              />
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="time">{notification.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="loader">No notifications available.</div>
        )}
      </div>

      {/* Company Card */}
      <div className="company-card">
        <h3>LinkedIn Company</h3>
        <p>Follow our company page for updates</p>
        <button>Follow</button>
      </div>
    </div>
  );
};

export default Notifications;
