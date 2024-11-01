import React from "react";
import "../styles/Homepage.css";
import { Review } from "../components/Review";

export const Homepage = () => {
  return (
    <>
      <div className="banner">
        <h1>Welcome to AceClean Xperts</h1>
        <p>Your one-stop solution for cleanliness and well-being</p>
        <button className="cta-btn">Book Now</button>
      </div>

      <div className="services">
        <h1>Why Choose Our Services?</h1>
      </div>

      <div className="image-grid1">
        <div className="grid-item">
          <img src="/images/Trusted_Experienced.jpg" alt="Image 1" />
          <p>Trusted & Experienced Professionals</p>
        </div>

        <div className="grid-item">
          <img src="/images/CustomizedCleaning.jpg" alt="Image 2" />
          <p>Customized Cleaning Solutions</p>
        </div>

        <div className="grid-item">
          <img src="/images/ecofriendly.jpg" alt="Image 3" />
          <p>Eco-friendly & Safe Cleaning Products</p>
        </div>
      </div>

      <div className="image-grid2">
        <div className="grid-item">
          <img src="/images/FlexibleScheduling.jpg" alt="Image 4" />
          <p>Reliable & Flexible Scheduling</p>
        </div>

        <div className="grid-item">
          <img src="/images/Transparency.jpg" alt="Image 5" />
          <p>Transparent Pricing & No Hidden Fees</p>
        </div>
      </div>

      <div className="cost-calculator">
        <h1>Calculate Your Estimated Cost</h1>
        <p>(Residential Cleaning Only)</p>
        <button className="cta-btn">Calculate Now</button>
        <p className="note">
          For Commercial Cleaning, contact us. Our team will help you out by
          analysing your requirements.
        </p>
      </div>

      <div className="testimonial-container">
        <Review /> {/* Add the Review component here */}
      </div>
    </>
  );
};
