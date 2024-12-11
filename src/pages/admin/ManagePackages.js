import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/admin/ManagePackages.module.css";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    type: "residential",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  // Fetch packages from the backend
  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setAlertMessage("Failed to fetch packages. Please try again.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission for adding/updating packages
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.price < 0) {
        setAlertMessage("Price cannot be negative.");
        return;
      }
      if (form.description.length < 10) {
        setAlertMessage("Description should be at least 10 characters long.");
        return;
      }

      if (isEditing) {
        await axios.put(`http://localhost:5001/api/packages/${editId}`, form);
        setAlertMessage("Package updated successfully!");
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5001/api/packages", form);
        setAlertMessage("Package added successfully!");
      }

      setForm({ name: "", price: 0, description: "", type: "residential" });
      fetchPackages();
    } catch (error) {
      console.error("Error submitting package:", error);
      setAlertMessage("An error occurred. Please try again.");
    }
  };

  // Handle package editing
  const handleEdit = (pkg) => {
    setForm(pkg);
    setIsEditing(true);
    setEditId(pkg._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle package deletion with confirmation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`http://localhost:5001/api/packages/${id}`);
        setAlertMessage("Package deleted successfully!");
        fetchPackages();
      } catch (error) {
        console.error("Error deleting package:", error);
        setAlertMessage("Failed to delete the package. Please try again.");
      }
    }
  };

  // Clear alert messages after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => setAlertMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [alertMessage]);

  return (
    <div className={styles.container}>
      <h2>Manage Cleaning Packages</h2>

      {/* Display success or error messages */}
      {alertMessage && <div className={styles.alert}>{alertMessage}</div>}

      {/* Form for adding or editing packages */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            name="name"
            placeholder="Package Name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            name="description"
            placeholder="Description (min 10 characters)"
            value={form.description}
            onChange={handleInputChange}
            minLength="10"
            required
          ></textarea>
        </div>
        <div className={styles.inputGroup}>
          <select name="type" value={form.type} onChange={handleInputChange}>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>
            {isEditing ? "Update Package" : "Add Package"}
          </button>
          {isEditing && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                setIsEditing(false);
                setEditId(null);
                setForm({
                  name: "",
                  price: 0,
                  description: "",
                  type: "residential",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Display list of packages in separate columns */}
      <div className={styles.packageContainer}>
        {/* Residential Packages */}
        <div className={styles.packageColumn}>
          <h2>Residential Packages</h2>
          {packages
            .filter((pkg) => pkg.type === "residential")
            .map((pkg) => (
              <div className={styles.packageCard} key={pkg._id}>
                <div className={styles.packageDetails}>
                  <h3>{pkg.name}</h3>
                  <p className={styles.packagePrice}>${pkg.price}</p>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                </div>
                <div className={styles.packageActions}>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Commercial Packages */}
        <div className={styles.packageColumn}>
          <h2>Commercial Packages</h2>
          {packages
            .filter((pkg) => pkg.type === "commercial")
            .map((pkg) => (
              <div className={styles.packageCard} key={pkg._id}>
                <div className={styles.packageDetails}>
                  <h3>{pkg.name}</h3>
                  <p className={styles.packagePrice}>${pkg.price}</p>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                </div>
                <div className={styles.packageActions}>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePackages;
