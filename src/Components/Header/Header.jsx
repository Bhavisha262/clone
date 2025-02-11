import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBriefcase, FaEnvelope, FaBell } from 'react-icons/fa';
import { TbGridDots } from "react-icons/tb";
import { RxFace } from "react-icons/rx";
import Sidebar from '../Sidebar/Sidebar';
import './Header.scss';
import logo from "../../assets/Logo/logo.png"

const Header = () => {
  return (
    <header className="header">
      {/* Slant Ray Animation */}
      <div className="ray"></div>

      <div className="header-container">
        {/* Left: Sidebar */}
        <div className="header-left">
          <Sidebar />
        </div>

        {/* Center: Logo */}
        <div className="header-center">
          <Link to="/" className="logo"><img src={logo} alt=''/></Link>
        </div>

        {/* Right: Navigation */}
        <nav className="header-right">
          <ul>
            <li><Link to="/network"><FaUsers className="icon" />Network</Link></li>
            <li><Link to="/jobs"><FaBriefcase className="icon" /> Jobs</Link></li>
            <li><Link to="/messaging"><FaEnvelope className="icon" /> Messaging</Link></li>
            <li><Link to="/notifications"><FaBell className="icon" /> Notifications</Link></li>
            <li><Link to="/profile"><RxFace className="icon" />ME</Link></li>
            <li><Link to="/settings"><TbGridDots className="icon" /></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
