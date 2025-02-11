import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUserFriends, FaBriefcase, FaComments, FaBell } from "react-icons/fa"; 
import "./Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Sidebar Visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Button */}
      <button className="menu-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />} {/* Change icon dynamically */}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li><FaHome className="icon" /> <span>Home</span></li>
          <li><FaUserFriends className="icon" /> <span>My Network</span></li>
          <li><FaBriefcase className="icon" /> <span>Jobs</span></li>
          <li><FaComments className="icon" /> <span>Messaging</span></li>
          <li><FaBell className="icon" /> <span>Notifications</span></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
