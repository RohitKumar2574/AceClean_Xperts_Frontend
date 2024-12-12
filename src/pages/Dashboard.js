import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  console.log(process.env.REACT_APP_API_URL);
  const [activeTab, setActiveTab] = useState("basic-clean");
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const navigate = useNavigate();

  const handleContactSupport = () => {
    navigate("/contact");
  };

  const serviceData = {
    "basic-clean": {
      title: "Basic Clean Package",
      description:
        "Maintain your home with light, efficient cleaning services designed for your everyday needs.",
      details: [
        "Vacuuming and mopping floors",
        "Dusting furniture and surfaces",
        "Wiping countertops",
        "Emptying trash bins",
      ],
    },
    "basic-plus": {
      title: "Basic Plus Package",
      description:
        "Upgrade your clean with more detailed attention to spaces that need extra care.",
      details: [
        "Includes all Basic Clean services",
        "Bathroom deep cleaning",
        "Small appliance cleaning",
        "Detailed dusting of decor",
      ],
    },
    "move-in-out-clean": {
      title: "Move In/Out Cleaning",
      description:
        "Ensure a spotless space for moving in or out with our comprehensive cleaning services.",
      details: [
        "Cleaning inside cabinets and closets",
        "Sanitizing bathrooms and kitchens",
        "Scrubbing walls and floors",
        "Polishing surfaces for a fresh look",
      ],
    },
    "deep-clean": {
      title: "Deep Cleaning Services Package",
      description:
        "A perfect choice for giving your home a fresh, spotless feel by tackling tough grime and dirt.",
      details: [
        "Tile and grout scrubbing",
        "Window and baseboard cleaning",
        "Ceiling fan cleaning",
        "Polishing wood furniture",
      ],
    },
  };

  // Fetch orders dynamically
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch upcoming orders (adjust URL to your API)
        const upcomingResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/appointments`,
          {
            params: { status: "upcoming", page: 1, limit: 10 },
          }
        );
        setUpcomingOrders(upcomingResponse.data.data);

        // Fetch order history (adjust URL to your API)
        const historyResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/appointments`,
          {
            params: { status: "completed", page: 1, limit: 10 },
          }
        );
        setOrderHistoryData(historyResponse.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const renderContent = () => {
    const content = serviceData[activeTab];
    return (
      <div className="content-container">
        <div className="service-content">
          <h1 className="service-title">{content.title}</h1>
          <p className="service-description">{content.description}</p>
          <ul className="service-details">
            {content.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="contact-section">
          <h3 className="contact-title">Need Help?</h3>
          <p className="contact-text">Get in touch!</p>
          <div className="contact-icons">
            <span className="icon">📧</span>
            <span className="icon">📞</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="banner text-center">
        <div className="banner-text text-center">
          <h1 style={{ color: "#fff" }}>Dashboard</h1>
          <p style={{ textAlign: "center" }}>
            {activeTab.replace("-", " ").toUpperCase()}
          </p>
        </div>
      </div>
      <div className="services-app">
        <nav className="services-tabs">
          {Object.keys(serviceData).map((tabKey) => (
            <button
              key={tabKey}
              className={activeTab === tabKey ? "active" : ""}
              onClick={() => setActiveTab(tabKey)}
            >
              {tabKey.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </nav>
        {renderContent()}
      </div>
      <div className="upcoming-orders">
        <h1>Upcoming Orders</h1>
        <div className="order-cards-container">
          {upcomingOrders.map((order) => (
            <div key={order.id} className="order-card">
              <h2 className="order-title">{order.packageName}</h2>
              <p className="order-date">
                <strong>Date:</strong> {order.date}
              </p>
              <p className="order-time">
                <strong>Time:</strong> {order.timeRange}
              </p>
              <button className="contact-button" onClick={handleContactSupport}>
                Contact Support
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="order-history">
        <h1>Order History</h1>
        <div className="history-cards-container">
          {orderHistoryData.map((order) => (
            <div key={order.id} className="history-card">
              <div className="history-details">
                <h2 className="history-title">{order.packageName}</h2>
                <p className="history-completed-date">
                  <strong>Date Completed:</strong> {order.updatedAt}
                </p>
                <p className="history-cleaner-name">
                  <strong>Cleaner:</strong> {order.cleanerName}
                </p>
                <p className="history-amount-paid">
                  <strong>Amount Paid:</strong> {order.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
