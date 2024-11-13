import React from "react";
import "../styles/Services.css";

export const Services = () => {
  return (
      <div className="services-container">
        <section className="hero">
          <h1>Our Professional Cleaning Services</h1>
          <p>Your Trusted Experts in Residential and Commercial Cleaning</p>
          <button className="cta-btn1">Get a Free Quote</button>
        </section>

        <section className="services">
          <h1>Our Services</h1>
          <div className="services-grid">
            <div className="residential-services">
              <h2>Residential Cleaning Services</h2>
              <div className="service-item">
                <h3>Deep Cleaning</h3>
                <p>Thorough cleaning for all rooms, kitchens, and bathrooms.</p>
              </div>
              <div className="service-item">
                <h3>Move-in/Move-out Cleaning</h3>
                <p>Specialized cleaning for homes before or after moving.</p>
              </div>
            </div>

            <div className="commercial-services">
              <h2>Commercial Cleaning Services</h2>
              <div className="service-item">
                <h3>Office Cleaning</h3>
                <p>Daily or weekly cleaning for office spaces.</p>
              </div>
              <div className="service-item">
                <h3>Event Cleaning</h3>
                <p>Pre- and post-event cleaning for corporate events and weddings.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose AceClean Xperts?</h2>
          <ul>
            <li>Eco-Friendly Products</li>
            <li>Trained Professionals</li>
            <li>Customized Cleaning Plans</li>
            <li>Flexible Scheduling</li>
          </ul>
        </section>

        <section className="cta-section1">
          <h2>Ready to Get Started?</h2>
          <button className="cta-btn1">Book Now</button>
        </section>
      </div>
  );
};
