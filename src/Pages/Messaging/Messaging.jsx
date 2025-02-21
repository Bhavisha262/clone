import React, { useState, useEffect } from 'react';
import './Messaging.scss';

// Define your message categories
const categories = ["Focused", "Unread", "My Connections", "InMail", "Starred"];

const Messaging = () => {
  // Local state for messages, active filter, search term, active conversation, thread, and composer text
  const [messages, setMessages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Focused");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversationThread, setConversationThread] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");

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
          (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredMessages(filtered);
  };

  // When a conversation is selected, simulate a thread (you would load real conversation data)
  const handleSelectConversation = (msg) => {
    setActiveConversation(msg);
    setConversationThread([
      {
        id: msg.id,
        sender: msg.sender,
        avatar: msg.avatar,
        content: msg.content || msg.subject,
        time: msg.time,
        read: msg.read
      },
      {
        id: 'reply-' + msg.id,
        sender: "You",
        avatar: "https://xsgames.co/randomusers/assets/avatars/female/21.jpg",
        content: "Thanks for reaching out! Let's catch up soon.",
        time: "Now",
        read: true
      }
    ]);
  };

  // Handle sending a new message in the conversation detail view
  const handleSendMessage = () => {
    if (newMessageText.trim() === "") return;
    const newMsg = {
      id: Date.now(),
      sender: "You",
      avatar: "https://xsgames.co/randomusers/assets/avatars/female/21.jpg",
      content: newMessageText,
      time: "Now",
      read: true
    };
    setConversationThread([...conversationThread, newMsg]);
    setNewMessageText("");
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
            <button className="icon-button" title="Options">
              <i className="fas fa-ellipsis-h"></i>
            </button>
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

        {/* Main body: Conversation list and Conversation detail */}
        <div className="messaging-body">
          {/* Left panel: Conversation List */}
          <div className="conversation-list">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-item ${!msg.read ? "unread" : ""}`}
                  onClick={() => handleSelectConversation(msg)}
                >
                  <img
                    className="avatar"
                    src={msg.avatar || "https://xsgames.co/randomusers/assets/avatars/female/21.jpg"}
                    alt={msg.sender}
                  />
                  <div className="message-info">
                    <div className="message-sender">{msg.sender}</div>
                    <div className="message-preview">{msg.text || "No text"}</div>
                  </div>
                  <div className="message-time">{msg.time}</div>
                </div>
              ))
            ) : (
              <div className="no-messages">No messages found.</div>
            )}
          </div>

          {/* Right panel: Conversation Detail */}
          <div className="conversation-detail">
            {activeConversation ? (
              <>
                <div className="conversation-header">
                  <img
                    className="avatar"
                    src={activeConversation.avatar || "https://via.placeholder.com/40"}
                    alt={activeConversation.sender}
                  />
                  <div className="conversation-sender">{activeConversation.sender}</div>
                </div>
                <div className="conversation-thread">
                  {conversationThread.map((threadMsg) => (
                    <div
                      key={threadMsg.id}
                      className={`thread-message ${threadMsg.sender === "You" ? "sent" : "received"}`}
                    >
                      <img
                        className="avatar"
                        src={threadMsg.avatar || "https://via.placeholder.com/40"}
                        alt={threadMsg.sender}
                      />
                      <div className="message-content">
                        <div className="message-text">{threadMsg.content}</div>
                        <div className="message-time">{threadMsg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="message-composer">
                  <button className="icon-button attach" title="Attach">
                    <i className="fas fa-paperclip"></i>
                  </button>
                  <button className="icon-button emoji" title="Emoji">
                    <i className="fas fa-smile"></i>
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleSendMessage(); }}
                  />
                  <button className="icon-button send" title="Send" onClick={handleSendMessage}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="no-conversation">Select a conversation to view details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
