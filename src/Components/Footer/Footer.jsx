import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="linkedin-footer">
      <div className="footer-top">
        <ul>
          <Link to='/about'><li>About</li></Link>
          <li>Accessibility</li>
          <li>Help Center</li>
        </ul>
        <ul>
          <li>Privacy & Terms</li>
          <li>Ad Choices</li>
        </ul>
        <ul>
          <li>Advertising</li>
          <li>Business Services</li>
        </ul>
        <ul>
          <li>Get the JobedIn App</li>
          <li>More</li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>JobedIn © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
