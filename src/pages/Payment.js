import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Retrieve appointment data from localStorage
  const appointmentData = JSON.parse(localStorage.getItem("appointmentData"));

  // Card validation functions
  const validateCardNumber = (number) =>
    /^[0-9]{16}$/.test(number.replace(/\s/g, ""));
  const validateExpiryDate = (expiry) =>
    /^(0[1-9]|1[0-2]) \/ [0-9]{2}$/.test(expiry);
  const validateCVV = (cvv) => /^[0-9]{3}$/.test(cvv);
  const validateCardholderName = (name) => name.trim().length > 0;

  // Handle input changes for card details
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // Format card number to add spaces after every 4 digits
      const formattedValue = value
        .replace(/\D/g, "") // Remove non-numeric characters
        .slice(0, 16) // Limit to 16 digits
        .replace(/(\d{4})/g, "$1 ") // Add a space after every 4 digits
        .trim(); // Remove trailing spaces
      setCardDetails((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else if (name === "expiryDate") {
      // Format expiry date to add ' / ' after MM
      const formattedValue = value
        .replace(/[^0-9]/g, "") // Remove non-numeric characters
        .slice(0, 4) // Limit to 4 digits (MMYY)
        .replace(/(\d{2})(\d{1,2})?/, (_, mm, yy) =>
          yy ? `${mm} / ${yy}` : mm
        ); // Add ' / ' after MM
      setCardDetails((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else {
      setCardDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset previous error messages
    setErrorMessage("");
    setIsProcessing(true);

    const { cardholderName, cardNumber, expiryDate, cvv } = cardDetails;

    // Validate the card details
    if (!validateCardholderName(cardholderName)) {
      setErrorMessage("Cardholder name cannot be empty.");
      setIsProcessing(false);
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setErrorMessage(
        "Invalid card number. Please enter a valid 16-digit card number."
      );
      setIsProcessing(false);
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      setErrorMessage("Invalid expiry date. Please enter in MM / YY format.");
      setIsProcessing(false);
      return;
    }

    if (!validateCVV(cvv)) {
      setErrorMessage("Invalid CVV. Please enter a valid 3-digit CVV.");
      setIsProcessing(false);
      return;
    }

    // Simulate payment process with a timeout
    setTimeout(async () => {
      setPaymentSuccess(true);

      // Send appointment data to the backend
      try {
        const response = await fetch("http://localhost:5001/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerNameForCleaning: appointmentData.customerNameForCleaning,
            preferredDate: appointmentData.preferredDate,
            preferredTimeRange: appointmentData.preferredTimeRange,
            cleaningType: appointmentData.cleaningType,
            packageName: appointmentData.packageName,
            packageDetails: appointmentData.packageDetails,
            packagePrice: appointmentData.packagePrice,
            hst: appointmentData.hst,
            totalPrice: appointmentData.totalPrice,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.removeItem("appointmentData"); // Clear the data after successful booking
          navigate("/dashboard"); // Redirect to the dashboard after successful booking
        } else {
          setErrorMessage(result.message || "Failed to book appointment.");
        }
      } catch (error) {
        console.error("Error saving appointment:", error);
        setErrorMessage("There was an error processing your appointment.");
      }

      setIsProcessing(false);
    }, 2000); // Simulating network delay
  };

  return (
    <div>
      <h2>Payment</h2>
      {paymentSuccess && <h3>Payment Successful!</h3>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            value={cardDetails.cardholderName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            maxLength="19" // Maximum length considering spaces
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div>
          <label>Expiry Date (MM / YY)</label>
          <input
            type="text"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleInputChange}
            placeholder="MM / YY"
            required
          />
        </div>

        <div>
          <label>CVV</label>
          <input
            type="password" // Mask input with asterisks
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleInputChange}
            maxLength="3"
            placeholder="***"
            required
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div>
          <p>Package Price: ${appointmentData.packagePrice.toFixed(2)}</p>
          <p>HST (13%): ${appointmentData.hst.toFixed(2)}</p>
          <p>Total Price: ${appointmentData.totalPrice.toFixed(2)}</p>
        </div>

        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};
