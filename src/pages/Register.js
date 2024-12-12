import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Register.module.css"; // Import styles from the first component

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setErrorMessage(result.error || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign Up</h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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

          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Please enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Control
              type="text"
              name="username"
              placeholder="Please enter your username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Please create new password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className={styles.button}>
            Register
          </Button>
        </Form>
        <p className={styles.registerText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className={styles.imageContainer}></div>
    </div>
  );
};

export default Register;
