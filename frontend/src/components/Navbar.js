import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container">
          {/* Loading the gif using require to ensure it is bundled */}
          <img src={require('../assets/gif/logo.gif')} alt="DetectAI Logo" className="logo-icon" />
          <span className="logo-text">DetectAI</span>
        </div>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/app" className="launch-button">
              Launch App
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
