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
  const [unavailableTimeRanges, setUnavailableTimeRanges] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchSlotsByDate = async (date) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5001/api/slots/date?date=${date}`);
      const slotData = response.data[0];

      if (slotData) {
        const availableSlots = slotData.slots.map(
          (slot) => `${slot.startTime} - ${slot.endTime}`
        );
        console.log({ availableSlots })
        setUnavailableTimeRanges(availableSlots);
        setErrorMessage("");
      } else {
        setUnavailableTimeRanges([]);
      }
      setLoading(false);
    } catch (error) {
      // setErrorMessage("Failed to fetch slots for the selected date.");
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/packages");
      setPackages(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch cleaning packages. Please try again later.");
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setAppointmentData((prevState) => ({
      ...prevState,
      preferredDate: selectedDate,
    }));
    fetchSlotsByDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { customerNameForCleaning, preferredDate, preferredTimeRange, packageName } = appointmentData;

    if (!customerNameForCleaning || !preferredDate || !preferredTimeRange || !packageName) {
      setErrorMessage("All fields are required.");
      return;
    }
    console.log({ appointmentData });
    setErrorMessage("");
    localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    navigate("/payment", { state: { appointmentData } });
  };

  const getPackageOptions = () => {
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
          onChange={handleDateChange}
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
            /> Residential
          </label>
          <label>
            <input
              type="radio"
              name="cleaningType"
              value="commercial"
              checked={appointmentData.cleaningType === "commercial"}
              onChange={handleCleaningTypeChange}
            /> Commercial
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
          {loading ? (
            <option>Loading...</option>
          ) : (
            timeRanges
              .filter((range) => !unavailableTimeRanges.includes(range))
              .map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))
          )}
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
        {console.log({ textArea: appointmentData.textArea })};
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
