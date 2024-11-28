import React, { useState } from "react";

import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("basic-clean");
  const navigate = useNavigate();
  const handleContactSupport = () => {
    navigate("/contact");
  };
  const handleContactCleaner = (cleanerName) => {
    alert(`Contacting Cleaner: ${cleanerName}`);
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
  const upcomingOrders = [
    {
      id: 1,
      title: "Deep Cleaning Service",
      date: "2024-11-25",
      time: "10:00 AM",
    },
    {
      id: 2,
      title: "Move-In Cleaning",
      date: "2024-12-01",
      time: "2:00 PM",
    },
    {
      id: 3,
      title: "Basic Clean Package",
      date: "2024-12-05",
      time: "11:30 AM",
    },
  ];
  const currentOrders = [
    {
      id: 1,
      title: "Deep Cleaning Service",
      status: "In Progress",
      cleanerName: "John Doe",
      imageUrl: "/assets/img/dashboard/service1.jpg",
    },
    {
      id: 2,
      title: "Move-In Cleaning",
      status: "Scheduled",
      cleanerName: "Jane Smith",
      imageUrl: "/assets/img/dashboard/service1.jpg",
    },
    {
      id: 3,
      title: "Basic Clean Package",
      status: "Completed",
      cleanerName: "Michael Brown",
      imageUrl: "/assets/img/dashboard/service1.jpg",
    },
  ];
  const orderHistoryData = [
    {
      id: 1,
      title: "Deep Cleaning Service",
      completedDate: "2023-11-20",
      cleanerName: "John Doe",
      amountPaid: "$120",
      imageUrl: "/assets/img/dashboard/history.jpg",
    },
    {
      id: 2,
      title: "Basic Cleaning Package",
      completedDate: "2023-11-15",
      cleanerName: "Jane Smith",
      amountPaid: "$80",
      imageUrl: "/assets/img/dashboard/history.jpg",
    },
    {
      id: 3,
      title: "Move-In Cleaning",
      completedDate: "2023-11-10",
      cleanerName: "Michael Brown",
      amountPaid: "$150",
      imageUrl: "/assets/img/dashboard/history.jpg",
    },
  ];
  
  

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
          <h1 style={{color:'#fff'}}>Dashboard</h1>
          <p style={{textAlign:'center'}}>{activeTab.replace("-", " ").toUpperCase()}</p>
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
              <h2 className="order-title">{order.title}</h2>
              <p className="order-date">
                <strong>Date:</strong> {order.date}
              </p>
              <p className="order-time">
                <strong>Time:</strong> {order.time}
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
              <img src={order.imageUrl} alt={order.title} className="history-image" />
              <div className="history-details">
                <h2 className="history-title">{order.title}</h2>
                <p className="history-completed-date">
                  <strong>Date Completed:</strong> {order.completedDate}
                </p>
                <p className="history-cleaner-name">
                  <strong>Cleaner:</strong> {order.cleanerName}
                </p>
                <p className="history-amount-paid">
                  <strong>Amount Paid:</strong> {order.amountPaid}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
