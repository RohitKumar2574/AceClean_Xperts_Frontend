import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { AuthContext } from "../AuthContext";

export const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="AceClean Xperts"
          />
        </Link>
      </div>

      <nav className="navbar">
        <ul>
          {isAuthenticated ? (
            // Show Dashboard link if authenticated
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            // Show Home, Services, About, and Contact Us if not authenticated
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="auth-buttons">
        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-btn">Register</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
