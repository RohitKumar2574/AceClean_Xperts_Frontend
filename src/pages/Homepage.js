import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calculator from "../components/Calculator";
import { Review } from "./Review";
import "../styles/Homepage.css";

export const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = () => {
    const isLoggedIn = !!localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/book");
    } else {
      navigate("/login");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Banner Section */}
      <div className="banner">
        <h1>Welcome to AceClean Xperts</h1>
        <p>Your one-stop solution for cleanliness and well-being</p>
        <button className="cta-btn" onClick={handleBookNow}>
          Book Now
        </button>
      </div>

      {/* Why Choose Our Services Section */}
      <div className="services">
        <h1>Why Choose Our Services?</h1>
      </div>

      <div className="image-grid1">
        <div className="grid-item">
          <img
            src="/images/Trusted_Experienced.jpg"
            alt="Trusted & Experienced Professionals"
          />
          <p>Trusted & Experienced Professionals</p>
        </div>
        <div className="grid-item">
          <img
            src="/images/CustomizedCleaning.jpg"
            alt="Customized Cleaning Solutions"
          />
          <p>Customized Cleaning Solutions</p>
        </div>
        <div className="grid-item">
          <img
            src="/images/ecofriendly.jpg"
            alt="Eco-friendly & Safe Cleaning Products"
          />
          <p>Eco-friendly & Safe Cleaning Products</p>
        </div>
      </div>

      <div className="image-grid2">
        <div className="grid-item">
          <img
            src="/images/FlexibleScheduling.jpg"
            alt="Reliable & Flexible Scheduling"
          />
          <p>Reliable & Flexible Scheduling</p>
        </div>
        <div className="grid-item">
          <img
            src="/images/Transparency.jpg"
            alt="Transparent Pricing & No Hidden Fees"
          />
          <p>Transparent Pricing & No Hidden Fees</p>
        </div>
      </div>

      {/* Cost Calculator Section */}
      <div className="cost-calculator">
        <h1>Calculate Your Estimated Cost</h1>
        <p>(Residential Cleaning Only)</p>
        <button className="cta-btn" onClick={handleOpenModal}>
          Calculate Now
        </button>
        <p className="note">
          For Commercial Cleaning, contact us. Our team will help you out by
          analysing your requirements.
        </p>
      </div>

      {/* Modal for Calculator */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              &times;
            </button>
            <Calculator />
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
