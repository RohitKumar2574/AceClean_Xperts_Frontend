import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        console.log("Registration successful:", result);
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      // Clear form data after successful registration
      setFormData({
        email: "",
        name: "",
        password: "",
      });
    }
  };

  return (
    <div className="center-form">
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </div>
  );
};
