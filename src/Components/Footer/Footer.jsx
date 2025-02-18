import React from "react";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const Navigate = useNavigate()
  return (
    <footer className="linkedin-footer">
      <div className="footer-top">
        <ul>
          <li onClick={() => Navigate('/about')}>About</li>
          <li onClick={() => Navigate('/accessibility')}>Accessibility</li>
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
        <p>JOBEDIN © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
