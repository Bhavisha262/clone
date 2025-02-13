import React, { useState, useEffect } from 'react';
import './Notifications.scss';

const TABS = ['All', 'Jobs', 'My Posts', 'Mentions'];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch notifications from the backend API
  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://backl-main.vercel.app/api/notifications');
      const data = await response.json();
      setNotifications(Array.isArray(data) ? data : data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter notifications based on activeTab
  const filteredNotifications =
    activeTab === 'All' ? notifications : notifications.filter((n) => n.category === activeTab);

  // Handle Manage Notifications Modal
  const toggleModal = () => setShowModal(!showModal);

  // Handle expanding sections
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Handle Follow Button Click
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setSnackbarMessage(isFollowing ? 'You have unfollowed JobedIn Company.' : 'You are now following JobedIn Company.');
    setTimeout(() => setSnackbarMessage(''), 3000);
  };

  return (
    <div className="notification-page">
      {/* Header Area */}
      <div className="header1">
        <div className="profile-card1">
          <img src="https://xsgames.co/randomusers/assets/avatars/female/21.jpg" alt="Profile" />
          <div className="profile-info">
            <h2>Sienna Johnson</h2>
            <p>Senior Full Stack Developer</p>
          </div>
        </div>
        <div className="manage-notifications-card">
          <button >Manage Your Notifications</button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs">
        {TABS.map((tab) => (
          <div key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </div>
        ))}
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <img src={notification.avatar || 'https://via.placeholder.com/40'} alt="Avatar" />
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
        <h3>JobedIn Company</h3>
        <p>Follow our company page for updates</p>
        <button onClick={handleFollow}>{isFollowing ? 'Following' : 'Follow'}</button>
      </div>


      {/* Snackbar for Follow Message */}
      {snackbarMessage && <div className="snackbar">{snackbarMessage}</div>}
    </div>
  );
};

export default Notifications;
