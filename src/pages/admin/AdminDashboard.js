import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faHourglassHalf, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);


// const bookings = [
//   {
//     id: 1,
//     type: "Deep_Cleaning",
//     title: "Deep Cleaning",
//     date: "27th Nov 2023",
//     location: "Retail Shop - 3 PM",
//   },
//   {
//     id: 2,
//     type: "Office_Cleaning",
//     title: "Office Cleaning",
//     date: "1st Dec 2023",
//     location: "Warehouse - 11 AM",
//   },
//   {
//     id: 3,
//     type: "Mvot_Cleaning",
//     title: "Move In/Out Cleaning",
//     date: "5th Dec 2023",
//     location: "Mall - 2 PM",
//   },
//   {
//     id: 3,
//     type: "Event_Cleaning",
//     title: "Event Cleaning",
//     date: "5th Dec 2023",
//     location: "Mall - 2 PM",
//   },
// ];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ordersCount, setOrdersCount] = useState({
    completedCount: 0,
    pendingCount: 0
  });
  const [lineDataSale, setLineDataSale] = useState([])

  const doughnutData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [ordersCount.completedCount, ordersCount.pendingCount],
        backgroundColor: ["#4e73df", "#eaeef7"],
        hoverBackgroundColor: ["#2e59d9", "#d8ddec"],
      },
    ],
  };


  const lineData = {
    labels: Array.from({ length: 30 }, (_, i) => {
      return new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString();
    }).reverse(),
    datasets: [
      {
        label: "Sales",
        data: lineDataSale,
        borderColor: "#1cc88a",
        tension: 0.3,
        pointBackgroundColor: "#1cc88a",
      },
    ],
  };

  const fetchDoughnutData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/appointments/status-graph');
      let { completedCount, pendingCount } = response.data;
      setOrdersCount({
        completedCount,
        pendingCount
      });
    } catch (error) {
      console.error('Error fetching doughnut data:', error);
    }
  };

  const fetchDailySales = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/appointments/daily-sales");
      setLineDataSale(response.data.data);
    } catch (error) {
      console.error("Error fetching daily sales:", error);
    }
  };

  const fetchBookings = async (status) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`http://localhost:5001/api/appointments`, {
        params: { status, page: 1, limit: 5 },
      });

      setBookings(response.data.data);
    } catch (error) {
      setError("Failed to fetch bookings. Please try again later.");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(activeTab.toLocaleLowerCase());
    fetchDoughnutData();
    fetchDailySales();
  }, [activeTab]);

  const [transactionData, setTransactionData] = useState([
    {
      orderId: "ORD12345",
      customerPhoto: "https://via.placeholder.com/50",
      repeatCustomer: true,
      itemsOrdered: 5,
      orderAmount: "$120.50",
    },
    {
      orderId: "ORD12346",
      customerPhoto: "https://via.placeholder.com/50",
      repeatCustomer: false,
      itemsOrdered: 3,
      orderAmount: "$80.00",
    },
    {
      orderId: "ORD12347",
      customerPhoto: "https://via.placeholder.com/50",
      repeatCustomer: true,
      itemsOrdered: 8,
      orderAmount: "$200.00",
    },
  ]);

  const filteredBookings = bookings.filter(
    (booking) => activeTab === "All" || booking.type === activeTab
  );
  const handleCheckboxChange = (index) => {
    const updatedTransactionData = [...transactionData];
    updatedTransactionData[index].repeatCustomer = !updatedTransactionData[index].repeatCustomer;
    setTransactionData(updatedTransactionData);
  };
  return (
    <>
      <div className={styles.container}>
        <h1>Upcoming Bookings</h1>
        <div className={styles.navTabs}>
          <button
            className={`${styles.tab} ${activeTab === "All" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("All")}
          >
            <FontAwesomeIcon icon={faList} /> All
          </button>
          <button
            className={`${styles.tab} ${activeTab === "Upcoming" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("Upcoming")}
          >
            <FontAwesomeIcon icon={faHourglassHalf} /> Upcoming
          </button>
          <button
            className={`${styles.tab} ${activeTab === "Completed" ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab("Completed")}
          >
            <FontAwesomeIcon icon={faCheckCircle} /> Completed
          </button>
        </div>
        {console.log(bookings)}
        <div className={styles.bookingsList}>
          {bookings.map((booking) => (
            <div key={booking.id} className={styles.bookingCard}>
              <div className={styles.bookingDetails}>
                <h2 style={{ textTransform: 'capitalize' }} >{booking.cleaningType}</h2>
                <p>Date: {booking.date.toLocaleString()}</p>
                <p>Slot: {booking.timeRange}</p>
                <p>Customer Name: {booking.customerName}</p>
                <p>
                  <label style={{
                    color: booking.status === 'completed' ? 'green' : booking.status === 'upcoming' ? 'yellow' : 'black'
                  }}>
                    {booking.status}
                  </label>
                </p>
              </div>
            </div>
          ))}
        </div>


      </div >
      <div className={styles.metricsContainer}>
        {/* Total Orders */}
        <div className={styles.card}>
          <p className={styles.label}>Total Orders</p>
          <h2 className={styles.value}>{ordersCount.completedCount + ordersCount.pendingCount}</h2>
          <Doughnut data={doughnutData} options={{ cutout: "70%", responsive: true }} style={{
            width: "100px",
            height: "100px",
          }} />
          <p className={`${styles.percentage} ${styles.negative}`}>▼ 5%</p>
        </div>

        {/* Sales */}
        <div className={styles.card}>
          <p className={styles.label}>Sales</p>
          <h2 className={styles.value}>
            $ {lineDataSale.reduce((b, a) => a + b, 0)}
          </h2>
          <Line data={lineData} options={{ plugins: { legend: { display: false } } }} />
          <p className={`${styles.percentage} ${styles.positive}`}>▲ 8%</p>
        </div>

        {/* Customer Reviews */}
        {/* <div className={styles.card}>
          <p className={styles.label}>Customer Reviews</p>
          <h2 className={styles.value}>320</h2>
          <Doughnut data={doughnutData} options={{ cutout: "70%" }} />
          <p className={`${styles.percentage} ${styles.negative}`}>▼ 12%</p>
        </div> */}
      </div>

      <div className={styles["transaction-container"]}>
        <h2 className={styles["transaction-title"]}>Transactions</h2>
        <table className={styles["transaction-table"]}>
          <thead>
            <tr>
              <th className={styles["transaction-th"]}>Order ID</th>
              <th className={styles["transaction-th"]}>Customer Name</th>
              <th className={styles["transaction-th"]}>Service</th>
              <th className={styles["transaction-th"]}>Package Name</th>
              <th className={styles["transaction-th"]}>Service Amount</th>
              <th className={styles["transaction-th"]}>HST</th>
              <th className={styles["transaction-th"]}>Total Amount Paid</th>

            </tr>
          </thead>
          <tbody>
            {bookings.map((transaction, index) => (
              <tr key={index} className={styles["transaction-tr"]}>
                <td className={styles["transaction-td"]}>{transaction._id}</td>
                <td className={styles["transaction-td"]}>{transaction.customerName}</td>
                <td className={styles["transaction-td"]}>{transaction.packageName}</td>
                <td className={styles["transaction-td"]}>{transaction.cleaningType}</td>
                <td className={styles["transaction-td"]}>$ {transaction.packagePrice}</td>
                <td className={styles["transaction-td"]}>$ {transaction.hst}</td>
                <td className={styles["transaction-td"]}>$ {transaction.totalPrice}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;

