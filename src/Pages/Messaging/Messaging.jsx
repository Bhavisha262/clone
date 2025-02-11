import React, { useState, useEffect } from 'react';
import './Messaging.scss';

// Define your message categories
const categories = ["Focused", "Unread", "My Connections", "InMail", "Starred"];

const Messaging = () => {
  // Local state for messages, active filter, and search term
  const [messages, setMessages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Focused");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Fetch messages from backend when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Re-filter messages when messages, category, or search term changes
  useEffect(() => {
    filterMessages();
  }, [messages, activeCategory, searchTerm]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("https://backl-main.vercel.app/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const filterMessages = () => {
    let filtered = [...messages];

    // If category is not "Focused", filter by the category (match lower case for simplicity)
    if (activeCategory !== "Focused") {
      filtered = filtered.filter(
        (msg) => msg.category === activeCategory.toLowerCase()
      );
    }
    // Filter by search term on sender or subject
    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredMessages(filtered);
  };

  return (
    <div className="messaging-container">
      <div className="messaging-card">
        {/* Header with Search and Action Icons */}
        <div className="messaging-header">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="header-icons">
            {/* Three-dots icon */}
            <button className="icon-button" title="Options">
              <i className="fas fa-ellipsis-h"></i>
            </button>
            {/* New Message icon */}
            <button className="icon-button new-message" title="New Message">
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="messaging-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-button ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List of Messages */}
        <div className="messages-list">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div key={msg.id} className="message-item">
                <div className="message-sender">{msg.sender}</div>
                <div className="message-subject">{msg.subject}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))
          ) : (
            <div className="no-messages">No messages found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging;
