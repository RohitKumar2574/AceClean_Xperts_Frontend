import React, { useState } from "react";
import "../styles/Calculator.css";

const Calculator = () => {
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [roomPrice, setRoomPrice] = useState(60);
  const [bathPrice, setBathPrice] = useState(70);
  const [kitchenPrice, setKitchenPrice] = useState(80);
  const [totalCost, setTotalCost] = useState(0);

  const handleCalculate = () => {
    const cost =
      Number(rooms) * roomPrice +
      Number(bathrooms) * bathPrice +
      Number(kitchen) * kitchenPrice;
    setTotalCost(cost);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;

    // Clear the input field if a non-numeric character is entered
    if (!/^\d*$/.test(value)) {
      setter("");
      return;
    }

    // Prevent negative numbers
    const numericValue = Number(value);
    if (numericValue < 0) {
      setter("");
    } else {
      setter(value); // Set the valid number
    }
  };

  return (
    <div className="calculator-container">
      <h2>Estimate Your Cleaning Cost</h2>
      <div className="input-group">
        <label>No Of Rooms:</label>
        <input
          type="number"
          value={rooms}
          onChange={handleInputChange(setRooms)}
        />
      </div>
      <div className="input-group">
        <label>No Of Bathrooms:</label>
        <input
          type="number"
          value={bathrooms}
          onChange={handleInputChange(setBathrooms)}
        />
      </div>
      <div className="input-group">
        <label>No Of Kitchen:</label>
        <input
          type="number"
          value={kitchen}
          onChange={handleInputChange(setKitchen)}
        />
      </div>
      <button onClick={handleCalculate}>Calculate Cost</button>
      {totalCost > 0 && (
        <div className="result">
          <h3>Estimated Cost: ${totalCost.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;
