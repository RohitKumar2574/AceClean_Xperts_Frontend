import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/Header.css";

export const Header = ({ isAuthenticated }) => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="AceClean Xperts" />
                </Link>
            </div>

            <nav className="navbar">
                <ul>
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
                </ul>
            </nav>

            <div className="auth-buttons">
                {isAuthenticated ? (
                    <button className="logout-btn" aria-label="Logout">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="login-btn" aria-label="Login">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="register-btn" aria-label="Register">
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};
