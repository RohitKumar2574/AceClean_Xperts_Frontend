import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "../styles/Payment.module.css";

export const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const appointmentData = JSON.parse(localStorage.getItem("appointmentData"));

  const validateCardNumber = (number) => /^[0-9\s]{19}$/.test(number);
  const validateExpiryDate = (expiry) =>
    /^(0[1-9]|1[0-2]) \/ ([0-9]{2})$/.test(expiry);
  const validateCVV = (cvv) => /^[0-9]{3}$/.test(cvv);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setCardDetails((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else if (name === "expiryDate") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1 / $2")
        .trim();
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

  const handleCardSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsProcessing(true);

    const { cardNumber, expiryDate, cvv, cardHolderName } = cardDetails;

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

    if (!cardHolderName) {
      setErrorMessage("Please enter the cardholder's name.");
      setIsProcessing(false);
      return;
    }

    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5001/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
        });

        const result = await response.json();

        if (response.ok) {
          setPaymentSuccess(true);
          localStorage.removeItem("appointmentData");
          navigate("/dashboard");
        } else {
          setErrorMessage(result.message || "Failed to book appointment.");
        }
      } catch (error) {
        console.error("Error saving appointment:", error);
        setErrorMessage("There was an error processing your appointment.");
      }

      setIsProcessing(false);
    }, 2000);
  };

  const handlePayPalSuccess = async (details) => {
    console.log("PayPal payment successful:", details);

    try {
      const response = await fetch("http://localhost:5001/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (response.ok) {
        setPaymentSuccess(true);
        localStorage.removeItem("appointmentData");
        navigate("/dashboard");
      } else {
        setErrorMessage(result.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      setErrorMessage("There was an error processing your appointment.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Payment</h2>
      {paymentSuccess && (
        <h3 className={styles.paymentSuccess}>Payment Successful!</h3>
      )}

      <div className={styles.selectPayment}>
        <label>Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {paymentMethod === "card" && (
        <form onSubmit={handleCardSubmit}>
          <div>
            <label>Cardholder Name</label>
            <input
              type="text"
              name="cardHolderName"
              value={cardDetails.cardHolderName}
              onChange={handleCardInputChange}
              required
            />
          </div>
          <div>
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
              maxLength="19"
              placeholder="xxxx xxxx xxxx xxxx"
              required
            />
          </div>
          <div>
            <label>Expiry Date (MM / YY)</label>
            <input
              type="text"
              name="expiryDate"
              value={cardDetails.expiryDate}
              onChange={handleCardInputChange}
              maxLength="7"
              placeholder="MM / YY"
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardInputChange}
              maxLength="3"
              required
            />
          </div>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      )}

      {paymentMethod === "paypal" && (
        <div className={styles.paypalSection}>
          <PayPalScriptProvider
            options={{
              "client-id":
                "Ae60xZulSDN1wkkb9D38HZQAYV3vmcADCAGue9olEzHAEAujPSYwEdFroWt-jA0D2A1EgZFTRrkuGyj6",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: appointmentData.totalPrice.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order
                  .capture()
                  .then((details) => handlePayPalSuccess(details));
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  );
};
