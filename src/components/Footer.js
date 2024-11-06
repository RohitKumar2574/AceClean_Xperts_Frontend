import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-nav">
        {/* <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a> */}


            <Link to="/">Home</Link>
            
            <Link to="/about">About</Link>
          
            <Link to="/privacy">Privacy</Link>
          
            <Link to="/terms">Terms</Link>
          
            <Link to="/contact">Contact Us</Link>
      </div>

      <div className="social-media">
        <a
          href="https://www.facebook.com/profile.php?id=61564392748953"
          target="_blank"
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/Facebook.png`}
            alt="Facebook"
          />
        </a>
        <a href="https://www.instagram.com/i.rohit99/" target="_blank">
          <img
            src={`${process.env.PUBLIC_URL}/icons/Instagram.png`}
            alt="Instagram"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/rohit-kumar-7abb471a4/"
          target="_blank"
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/LinkedIn.png`}
            alt="LinkedIn"
          />
        </a>
      </div>

      <div className="newsletter-signup">
        <form action="/subscribe" method="POST">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="copyright">
        <p>&copy; 2024 AceClean Xperts. All rights reserved.</p>
      </div>
    </footer>
  );
};
