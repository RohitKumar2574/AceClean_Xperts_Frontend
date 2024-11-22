import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const appointmentData = JSON.parse(localStorage.getItem("appointmentData"));

  const validateCardNumber = (number) => {
    const regex = /^[0-9]{16}$/;
    return regex.test(number);
  };

  const validateExpiryDate = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4})$/;
    return regex.test(expiry);
  };

  const validateCVV = (cvv) => {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvv);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsProcessing(true);

    // Validate all card details
    const { cardNumber, expiryDate, cvv } = cardDetails;

    if (!validateCardNumber(cardNumber)) {
      setErrorMessage(
        "Invalid card number. Please enter a valid 16-digit card number."
      );
      setIsProcessing(false);
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      setErrorMessage(
        "Invalid expiry date. Please enter a valid expiry date in MM/YYYY format."
      );
      setIsProcessing(false);
      return;
    }

    if (!validateCVV(cvv)) {
      setErrorMessage("Invalid CVV. Please enter a valid 3-digit CVV.");
      setIsProcessing(false);
      return;
    }

    // Simulate payment process
    setTimeout(async () => {
      // Simulate payment success
      setPaymentSuccess(true);

      // Send the appointment data to the backend to be saved in the database
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
          navigate("/dashboard"); // Redirect to the dashboard
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
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            maxLength="16"
            required
          />
        </div>

        <div>
          <label>Expiry Date (MM/YYYY)</label>
          <input
            type="text"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleInputChange}
            maxLength="7"
            placeholder="MM/YYYY"
            required
          />
        </div>

        <div>
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleInputChange}
            maxLength="3"
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
