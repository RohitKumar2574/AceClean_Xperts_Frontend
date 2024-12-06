import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/admin/AllocateSlots.module.css";

const AllocateSlots = () => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedCleaningType, setSelectedCleaningType] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);
  const [packages, setPackages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const timeRanges = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
    "8:00 PM - 10:00 PM",
  ];

  useEffect(() => {
    if (selectedCleaningType) {
      fetchPackages(selectedCleaningType);
    }
  }, [selectedCleaningType]);

  useEffect(() => {
    if (selectedDates.length > 0) {
      fetchSlotsByDate(selectedDates[0]);
    }
  }, [selectedDates]);

  const fetchPackages = async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/packages?type=${type}`
      );
      setPackages(response.data);
    } catch (error) {
      setErrorMessage(
        "Failed to fetch cleaning packages. Please try again later."
      );
    }
  };

  const fetchSlotsByDate = async (date) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5001/api/slots/date?date=${date}`
      );
      const slotData = response.data[0];

      if (slotData) {

        setSelectedPackage(slotData.packageId);
        setSelectedCleaningType(slotData.cleaningType);
        setSelectedTimeRanges(
          slotData.slots.map(
            (slot) => `${slot.startTime} - ${slot.endTime}`
          )
        );
        setErrorMessage("");
      } else {
        setSelectedPackage("");
        setSelectedCleaningType("");
        setSelectedTimeRanges([]);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage("Failed to fetch slots for the selected date.");
      setLoading(false);
    }
  };


  const handleCleaningTypeChange = (e) => {
    console.log('handleCleaningTypeChange', selectedCleaningType);
    const type = e.target.value;
    setSelectedCleaningType(type);
    setSelectedPackage("");
    setErrorMessage("");
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const handleDateChange = async (e) => {
    const { value } = e.target;
    setSelectedDates([value]);
    setErrorMessage("");
    setSuccessMessage("");
    if (value) {
      await fetchSlotsByDate(value);
    }
  };

  const handleTimeRangeChange = (e) => {
    const { value } = e.target;
    setSelectedTimeRanges((prevTimeRanges) => {
      if (prevTimeRanges.includes(value)) {
        return prevTimeRanges.filter((time) => time !== value);
      }
      return [...prevTimeRanges, value];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedPackage ||
      selectedDates.length === 0 ||
      selectedTimeRanges.length === 0 ||
      !selectedCleaningType
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newSlots = {
      packageId: selectedPackage,
      packageName: packages.find((pkg) => pkg._id === selectedPackage)?.name || "",
      date: selectedDates,
      slots: selectedTimeRanges.map((timeRange) => {
        const [startTime, endTime] = timeRange.split(" - ");
        return {
          startTime: startTime.trim(),
          endTime: endTime.trim(),
          status: "available", // Default status
        };
      }),
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:5001/api/slots", newSlots);
      setSuccessMessage("Slots allocated successfully!");
      await fetchSlotsByDate(selectedDates[0]);
      setSelectedPackage("");
      setSelectedDates([]);
      setSelectedTimeRanges([]);
      setSelectedCleaningType("");
      setErrorMessage("");
      setLoading(false);
    } catch (error) {
      setErrorMessage("Failed to allocate slots. Please try again later.");
      setLoading(false);
    }
  };


  const getPackageOptions = () => {
    return packages.map((pkg) => (
      <option key={pkg._id} value={pkg._id}>
        {pkg.name}
      </option>
    ));
  };

  return (
    <div className={styles.container}>
      <h1>Allocate Slots</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Choose Cleaning Type</h2>
        <div className={styles.radioButtons}>
          <label>
            <input
              type="radio"
              name="cleaningType"
              value="residential"
              checked={selectedCleaningType === "residential"}
              onChange={handleCleaningTypeChange}
            />{" "}
            Residential
          </label>
          <label>
            <input
              type="radio"
              name="cleaningType"
              value="commercial"
              checked={selectedCleaningType === "commercial"}
              onChange={handleCleaningTypeChange}
            />{" "}
            Commercial
          </label>
        </div>


        <h2>Select Package</h2>
        <div className={styles.packageSelection}>
          <select value={selectedPackage || ""} onChange={handlePackageChange}>
            <option value="">Select Package</option>
            {getPackageOptions()}
          </select>
        </div>

        <h2>Select Date</h2>
        <div className={styles.dateSelection}>
          <input type="date" value={selectedDates[0]} onChange={handleDateChange} />
        </div>

        <h2>Select Time Ranges</h2>
        <div className={styles.timeRangeSelection}>
          {timeRanges.map((timeRange) => (
            <label key={timeRange}>
              <input
                type="checkbox"
                value={timeRange}
                onChange={handleTimeRangeChange}
                checked={selectedTimeRanges.includes(timeRange)}
              />
              {timeRange}
            </label>
          ))}
        </div>

        <button
          className={styles.button}
          type="submit"
          disabled={loading}
        >
          {loading ? "Allocating..." : "Allocate Slots"}
        </button>
      </form>

    
    </div>
  );
};

export default AllocateSlots;
