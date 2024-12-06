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

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      setAlertMessage("An error occurred, please try again.");
    }
  };

  const handleEdit = (pkg) => {
    setForm(pkg);
    setIsEditing(true);
    setEditId(pkg._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/packages/${id}`);
      setAlertMessage("Package deleted successfully!");
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
      setAlertMessage("An error occurred while deleting the package.");
    }
  };

  const residentialPackages = packages.filter(
    (pkg) => pkg.type === "residential"
  );
  const commercialPackages = packages.filter(
    (pkg) => pkg.type === "commercial"
  );

  return (
    <div className={styles.container}>
      <h2>Manage Cleaning Packages</h2>

      {alertMessage && <div className={styles.alert}>{alertMessage}</div>}

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
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className={styles.inputGroup}>
          <select name="type" value={form.type} onChange={handleInputChange}>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <button type="submit" className={styles.submitBtn}>
          {isEditing ? "Update Package" : "Add Package"}
        </button>
      </form>

      <div className={styles.packageContainer}>
        <div className={styles.packageColumn}>
          <h3>Residential Packages</h3>
          {residentialPackages.map((pkg) => (
            <div className={styles.packageCard} key={pkg._id}>
              <div className={styles.packageDetails}>
                <h4>{pkg.name}</h4>
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

        <div className={styles.packageColumn}>
          <h3>Commercial Packages</h3>
          {commercialPackages.map((pkg) => (
            <div className={styles.packageCard} key={pkg._id}>
              <div className={styles.packageDetails}>
                <h4>{pkg.name}</h4>
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
