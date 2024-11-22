import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ScheduleMyCleaning = () => {
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

  const navigate = useNavigate();

  const residentialPackages = [
    {
      name: "Basic Clean",
      price: 150,
      description:
        "Light dusting, vacuuming, mopping, and cleaning of high-traffic areas.",
    },
    {
      name: "Deep Clean",
      price: 300,
      description:
        "Includes basic clean plus detailed cleaning of bathrooms, kitchens, baseboards, windows, and hard-to-reach areas.",
    },
    {
      name: "Move-In/Move-Out Cleaning",
      price: 400,
      description:
        "Full cleaning of the entire home, including inside cabinets, drawers, and appliances.",
    },
    {
      name: "Recurring Cleaning Packages",
      price: 200,
      description:
        "A mix of regular maintenance cleanings, such as dusting, vacuuming, and bathroom/kitchen cleaning.",
    },
    {
      name: "Specialty Clean",
      price: 400,
      description:
        "Customized services based on client needs, like cleaning windows, air ducts, or post-renovation debris removal.",
    },
  ];

  const commercialPackages = [
    {
      name: "Basic Office Cleaning",
      price: 300,
      description:
        "Emptying trash, vacuuming, dusting, and cleaning common areas like kitchens and bathrooms.",
    },
    {
      name: "Comprehensive Office Cleaning",
      price: 600,
      description:
        "Includes everything in the basic package plus detailed desk and work surface cleaning, window cleaning, and sanitizing.",
    },
    {
      name: "Post-Construction or Renovation Cleaning",
      price: 1000,
      description:
        "Cleaning up dust, debris, and remnants from a construction project.",
    },
  ];

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
    const selectedPackage =
      appointmentData.cleaningType === "residential"
        ? residentialPackages.find((pkg) => pkg.name === selectedPackageName)
        : commercialPackages.find((pkg) => pkg.name === selectedPackageName);

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
    // Save appointment data to localStorage
    localStorage.setItem("appointmentData", JSON.stringify(appointmentData));

    // Navigate to payment page
    navigate("/payment");
  };

  const getPackageOptions = () => {
    if (appointmentData.cleaningType === "residential") {
      return residentialPackages.map((pkg, index) => (
        <option key={index} value={pkg.name}>
          {pkg.name}
        </option>
      ));
    } else if (appointmentData.cleaningType === "commercial") {
      return commercialPackages.map((pkg, index) => (
        <option key={index} value={pkg.name}>
          {pkg.name}
        </option>
      ));
    }
    return <option value="">Select a package</option>;
  };

  return (
    <div>
      <h2>Schedule My Cleaning Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerNameForCleaning"
          placeholder="Your Name"
          value={appointmentData.customerNameForCleaning}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="preferredDate"
          value={appointmentData.preferredDate}
          onChange={handleInputChange}
          required
        />
        <label>
          Cleaning Type:
          <input
            type="radio"
            name="cleaningType"
            value="residential"
            checked={appointmentData.cleaningType === "residential"}
            onChange={handleCleaningTypeChange}
          />{" "}
          Residential
          <input
            type="radio"
            name="cleaningType"
            value="commercial"
            checked={appointmentData.cleaningType === "commercial"}
            onChange={handleCleaningTypeChange}
          />{" "}
          Commercial
        </label>
        <select
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
          name="packageName"
          value={appointmentData.packageName}
          onChange={handlePackageChange}
          required
        >
          <option value="">Select Package</option>
          {getPackageOptions()}
        </select>
        <textarea
          name="packageDetails"
          value={appointmentData.packageDetails}
          readOnly
        />
        <div>
          <p>Package Price: ${appointmentData.packagePrice.toFixed(2)}</p>
          <p>HST (13%): ${appointmentData.hst.toFixed(2)}</p>
          <p>Total Price: ${appointmentData.totalPrice.toFixed(2)}</p>
        </div>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};
