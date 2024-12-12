import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../AuthContext";

export const Header = () => {
  const { isAuthenticated, logout, user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken && !isAuthenticated) {
      // Avoid repeated logins
      try {
        const decodedUser = jwtDecode(authToken);
        login(authToken, decodedUser);
        console.log("User logged in:", decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
        navigate("/login");
      }
    }
  }, [isAuthenticated, login, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderLinks = () => {
    if (isAuthenticated) {
      if (user.role === "customer") {
        return (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/schedule-my-cleaning">Schedule My Cleaning</Link>
            </li>
            <li>
              <Link to="/review">Review</Link>
            </li>
          </>
        );
      } else if (user.role === "admin") {
        return (
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
        );
      }
    } else {
      return (
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
      );
    }
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
        <ul>{renderLinks()}</ul>
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
