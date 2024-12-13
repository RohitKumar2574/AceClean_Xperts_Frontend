import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/ScheduleMyCleaning.module.css";

export const ScheduleMyCleaning = () => {
  const [packages, setPackages] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    customerNameForCleaning: "",
    preferredDate: "",
    preferredTimeRange: "",
    cleaningType: "",
    packageName: "",
    packageDetails: "",
    packagePrice: 0,
    hst: 0,
    totalPrice: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const timeRanges = [
    "01:00 AM - 02:00 AM",
    "02:00 AM - 03:00 AM",
    "03:00 AM - 04:00 AM",
    "04:00 AM - 05:00 AM",
    "05:00 AM - 06:00 AM",
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
    "08:00 PM - 09:00 PM",
    "09:00 PM - 10:00 PM",
    "10:00 PM - 11:00 PM",
    "11:00 PM - 12:00 AM",
    "12:00 AM - 01:00 AM",
  ];

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/packages");
      setPackages(response.data); // Set the fetched packages
    } catch (error) {
      setErrorMessage(
        "Failed to fetch cleaning packages. Please try again later."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCleaningTypeChange = (e) => {
    const type = e.target.value;
    setAppointmentData((prevState) => ({
      ...prevState,
      cleaningType: type,
      packageName: "",
      packageDetails: "",
      packagePrice: 0,
      hst: 0,
      totalPrice: 0,
    }));
  };

  const handlePackageChange = (e) => {
    const selectedPackageName = e.target.value;
    const selectedPackage = packages.find(
      (pkg) =>
        pkg.name === selectedPackageName &&
        pkg.type === appointmentData.cleaningType
    );

    if (selectedPackage) {
      const hst = parseFloat((0.13 * selectedPackage.price).toFixed(2));
      const totalPrice = parseFloat((selectedPackage.price + hst).toFixed(2));

      setAppointmentData((prevState) => ({
        ...prevState,
        packageName: selectedPackage.name,
        packageDetails: selectedPackage.description,
        packagePrice: selectedPackage.price,
        hst,
        totalPrice,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const {
      customerNameForCleaning,
      preferredDate,
      preferredTimeRange,
      packageName,
    } = appointmentData;
  
    if (
      !customerNameForCleaning ||
      !preferredDate ||
      !preferredTimeRange ||
      !packageName
    ) {
      setErrorMessage("All fields are required.");
      return;
    }
  
    setErrorMessage(""); // Clear previous errors
  
    // Redirect to the payment page with appointmentData as state
    navigate("/payment", { state: { appointmentData } });
  };
  

  const getPackageOptions = () => {
    // Filter packages based on the selected cleaning type
    return packages
      .filter((pkg) => pkg.type === appointmentData.cleaningType)
      .map((pkg) => (
        <option key={pkg._id} value={pkg.name}>
          {pkg.name}
        </option>
      ));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Schedule My Cleaning Appointment</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          type="text"
          name="customerNameForCleaning"
          placeholder="Your Name"
          value={appointmentData.customerNameForCleaning}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.inputField}
          type="date"
          name="preferredDate"
          value={appointmentData.preferredDate}
          onChange={handleInputChange}
          required
        />
        <div className={styles.radioButtons}>
          <label>
            <input
              type="radio"
              name="cleaningType"
              value="residential"
              checked={appointmentData.cleaningType === "residential"}
              onChange={handleCleaningTypeChange}
            />{" "}
            Residential
          </label>
          <label>
            <input
              type="radio"
              name="cleaningType"
              value="commercial"
              checked={appointmentData.cleaningType === "commercial"}
              onChange={handleCleaningTypeChange}
            />{" "}
            Commercial
          </label>
        </div>
        <select
          className={styles.inputField}
          name="preferredTimeRange"
          value={appointmentData.preferredTimeRange}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Time Range</option>
          {timeRanges.map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>
        <select
          className={styles.inputField}
          name="packageName"
          value={appointmentData.packageName}
          onChange={handlePackageChange}
          required
        >
          <option value="">Select Package</option>
          {getPackageOptions()}
        </select>
        <textarea
          className={styles.textArea}
          name="packageDetails"
          value={appointmentData.packageDetails}
          readOnly
        />
        <div className={styles.priceDetails}>
          <p>Package Price: ${appointmentData.packagePrice.toFixed(2)}</p>
          <p>HST (13%): ${appointmentData.hst.toFixed(2)}</p>
          <p>Total Price: ${appointmentData.totalPrice.toFixed(2)}</p>
        </div>
        <button className={styles.button} type="submit">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};
