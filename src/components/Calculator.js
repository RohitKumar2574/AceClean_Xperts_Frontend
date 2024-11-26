import React, { useState } from "react";
import "../styles/Calculator.css";

const Calculator = () => {
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [kitchen, setKitchen] = useState(0);
  const [price, setPrice] = useState(5);
  const [totalCost, setTotalCost] = useState(0);

  const handleCalculate = () => {
    const totalArea = rooms + bathrooms + kitchen;
    const cost = totalArea * price;
    setTotalCost(cost);
  };

  return (
    <div className="calculator-container">
      <h2>Estimate Your Cleaning Cost</h2>
      <div className="input-group">
        <label>No Of Rooms:</label>
        <input
          type="number"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>No Of Bathrooms:</label>
        <input
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>No Of Kitchen:</label>
        <input
          type="number"
          value={kitchen}
          onChange={(e) => setKitchen(Number(e.target.value))}
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
