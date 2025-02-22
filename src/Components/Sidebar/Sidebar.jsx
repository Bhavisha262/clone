import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUserFriends, FaBriefcase, FaComments, FaBell } from "react-icons/fa"; 
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate();

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
          <li onClick={() => Navigate('/') || setIsOpen(false)}><FaHome className="icon" /> <span>Home</span></li>
          <li onClick={() => Navigate('/network') || setIsOpen(false)}><FaUserFriends className="icon" /> <span>My Network</span></li>
          <li onClick={() => Navigate('/jobs') || setIsOpen(false)}><FaBriefcase className="icon" /> <span>Jobs</span></li>
          <li onClick={() => Navigate('/messaging') || setIsOpen(false)}><FaComments className="icon" /> <span>Messaging</span></li>
          <li onClick={() => Navigate('/notifications') || setIsOpen(false)}><FaBell className="icon" /> <span>Notifications</span></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
