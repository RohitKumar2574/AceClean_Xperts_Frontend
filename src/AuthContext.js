import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create a context for authentication
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide authentication state and functions
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if the token is in localStorage on component mount
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true); // User is authenticated
    }
  }, []);

  const login = (authToken) => {
    // Store the token in localStorage and update state
    localStorage.setItem("authToken", authToken);
    setToken(authToken);
    setIsAuthenticated(true);

    // Optionally, navigate to a specific page after login
    navigate("/dashboard");
  };

  const logout = () => {
    // Remove the token from localStorage and update state
    localStorage.removeItem("authToken");
    setToken(null);
    setIsAuthenticated(false);

    // Optionally, navigate to the login page after logout
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
