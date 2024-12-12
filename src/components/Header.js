import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { AuthContext } from "../AuthContext";
import { jwtDecode } from "jwt-decode";

export const Header = () => {
  const { isAuthenticated, logout, user, login } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    // Check for authToken in localStorage when component mounts
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // Update AuthContext state if authToken is found
      const user = jwtDecode(authToken);
      login(authToken, user); // Pass the user object to the login function
    }
  }, [login]); // Include login in the dependency array to avoid linting warnings

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
          {isAuthenticated && user.role === "customer" ? (
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
          ) : isAuthenticated && user.role === "admin" ? (
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
