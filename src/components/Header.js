import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        {/* Referencing the logo directly from the public folder */}
        <Link to='/'><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="AceClean Xperts" /></Link>
      </div>

      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>

      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
      </div>
    </header>
  );
};
