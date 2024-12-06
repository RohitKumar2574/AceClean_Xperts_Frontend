import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { AuthContext } from "../AuthContext";

export const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  console.log(user);
  
  const navigate = useNavigate();
  const { role } = user;

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
          {isAuthenticated && role === "customer" ? (
            <>
              {/* Show Dashboard and Schedule My Cleaning if authenticated */}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/schedule-my-cleaning">Schedule My Cleaning</Link>{" "}
                {/* Updated path */}
              </li>
              <li>
                <Link to="/review">Review</Link>
              </li>
            </>
          ) : isAuthenticated && role === "admin" ? (
            <>
              <li>
                <Link to="/admin-dashboard">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/allocate-slots">Allocate Slots</Link>
              </li>
              <li>
                <Link to="/manage-packages">Manage Packages</Link>
              </li>
            </>
          ) : (
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
