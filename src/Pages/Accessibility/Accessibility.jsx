import React, { useState } from "react";
import "./Accessibility.scss";

const Accessibility = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState("medium");
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div className={`accessibility-page ${highContrast ? "high-contrast" : ""}`}>
      <header className="accessibility-header">
        <div className="header-content">
          <h1>Accessibility</h1>
          <p>Customize your experience for better accessibility.</p>
        </div>
        <div className="shape one"></div>
        <div className="shape two"></div>
        <div className="shape three"></div>
      </header>

      <div className="accessibility-content">
        <div className="section">
          <h2>High Contrast Mode</h2>
          <p>Enhances contrast for better readability.</p>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={highContrast} 
              onChange={() => setHighContrast(!highContrast)} 
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="section">
          <h2>Text Size</h2>
          <p>Adjust the font size for better visibility.</p>
          <select value={textSize} onChange={(e) => setTextSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="section">
          <h2>Keyboard Navigation</h2>
          <p>Highlight focus areas when using keyboard navigation.</p>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={keyboardNav} 
              onChange={() => setKeyboardNav(!keyboardNav)} 
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="section">
          <h2>Screen Reader Support</h2>
          <p>Optimize content for screen readers.</p>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={screenReader} 
              onChange={() => setScreenReader(!screenReader)} 
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="section">
          <h2>Reduce Motion</h2>
          <p>Disable animations for a smoother experience.</p>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={reduceMotion} 
              onChange={() => setReduceMotion(!reduceMotion)} 
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
