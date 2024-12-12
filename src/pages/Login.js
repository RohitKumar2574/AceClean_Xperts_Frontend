import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.css"; // Use the styles from the first component
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../AuthContext";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        // Store token in localStorage for persistence
        localStorage.setItem("authToken", result.token);
        // Store logged user in email
        localStorage.setItem("email", formData.email);
        const user = jwtDecode(result?.token);

        // Update AuthContext state
        login(result.token);

        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>
          Thanks For <span>Being Here</span>
        </h2>
        <Form onSubmit={handleSubmit} className={styles.form}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Please enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </Form.Group>

          <Button variant="warning" type="submit" className={styles.button}>
            Log In
          </Button>
        </Form>
        <p className={styles.registerText}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <div className={styles.imageContainer}></div>
    </div>
  );
};

export default Login;
