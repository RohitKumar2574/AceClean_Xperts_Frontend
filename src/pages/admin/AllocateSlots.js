import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/admin/AllocateSlots.module.css";

const AllocateSlots = () => {
  const [slots, setSlots] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedCleaningType, setSelectedCleaningType] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);
  const [packages, setPackages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleCleaningTypeChange = (e) => {
    const type = e.target.value;
    setSelectedCleaningType(type);
    setSelectedPackage("");
    setErrorMessage("");
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setSelectedDates((prevDates) => {
      if (prevDates.includes(value)) {
        return prevDates.filter((date) => date !== value);
      }
      return [...prevDates, value];
    });
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

  const handleSubmit = (e) => {
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

    const newSlots = selectedDates
      .map((date) =>
        selectedTimeRanges.map((timeRange) => ({
          package: selectedPackage,
          date: date,
          timeRange: timeRange,
          cleaningType: selectedCleaningType,
        }))
      )
      .flat();

    setSlots([...slots, ...newSlots]);
    setSelectedPackage("");
    setSelectedDates([]);
    setSelectedTimeRanges([]);
    setSelectedCleaningType("");
    setErrorMessage("");
  };

  const getPackageOptions = () => {
    return packages.map((pkg) => (
      <option key={pkg._id} value={pkg.name}>
        {pkg.name}
      </option>
    ));
  };

  return (
    <div className={styles.container}>
      <h1>Allocate Slots</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

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

        <h2>Select Dates</h2>
        <div className={styles.dateSelection}>
          <input
            type="date"
            value={selectedDates[0]}
            onChange={handleDateChange}
            multiple
          />
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

        <h2>Select Package</h2>
        <div className={styles.packageSelection}>
          <select value={selectedPackage} onChange={handlePackageChange}>
            <option value="">Select Package</option>
            {getPackageOptions()}
          </select>
        </div>

        <button
          className={styles.button}
          type="submit"
          disabled={
            !selectedPackage ||
            selectedDates.length === 0 ||
            selectedTimeRanges.length === 0
          }
        >
          Allocate Slots
        </button>
      </form>

      <h2>Allocated Slots</h2>
      <ul className={styles.slotList}>
        {slots.map((slot, index) => (
          <li key={index}>
            <strong>{slot.package}</strong>
            <span>
              {slot.date} - {slot.timeRange}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllocateSlots;
