import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/admin/ManagePackages.css";

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
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5001/api/packages", form);
      }
      setForm({ name: "", price: 0, description: "", type: "residential" });
      fetchPackages();
    } catch (error) {
      console.error("Error submitting package:", error);
    }
  };

  const handleEdit = (pkg) => {
    setForm(pkg);
    setIsEditing(true);
    setEditId(pkg._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/packages/${id}`);
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Cleaning Packages</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Package Name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <select name="type" value={form.type} onChange={handleInputChange}>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>
        <button type="submit">
          {isEditing ? "Update Package" : "Add Package"}
        </button>
      </form>
      <ul className={styles.packageList}>
        {packages.map((pkg) => (
          <li key={pkg._id}>
            <strong>{pkg.name}</strong> - ${pkg.price} ({pkg.type})
            <p>{pkg.description}</p>
            <div className={styles.buttons}>
              <button onClick={() => handleEdit(pkg)} className="editBtn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="deleteBtn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePackages;
