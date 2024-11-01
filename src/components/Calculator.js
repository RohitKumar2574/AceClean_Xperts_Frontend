import React, { useState } from "react";
import "../styles/Calculator.css"; // Optional: You can create a CSS file for styling

const Calculator = () => {
    const [rooms, setRooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [kitchen, setKitchen] = useState(0);
    const [pricePerSqFt, setPricePerSqFt] = useState(5); // Example fixed price per sq ft
    const [totalCost, setTotalCost] = useState(0);

    const handleCalculate = () => {
        const totalArea = rooms + bathrooms + kitchen; // Total area in square feet
        const cost = totalArea * pricePerSqFt; // Estimated cost
        setTotalCost(cost);
    };

    return (
        <div className="calculator-container">
            <h2>Estimate Your Cleaning Cost</h2>
            <div className="input-group">
                <label>Rooms (sq ft):</label>
                <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label>Bathrooms (sq ft):</label>
                <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label>Kitchen (sq ft):</label>
                <input
                    type="number"
                    value={kitchen}
                    onChange={(e) => setKitchen(Number(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label>Price per Square Foot:</label>
                <input
                    type="number"
                    value={pricePerSqFt}
                    onChange={(e) => setPricePerSqFt(Number(e.target.value))}
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
