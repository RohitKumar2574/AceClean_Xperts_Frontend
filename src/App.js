import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Homepage } from "./pages/Homepage";
import { Services } from "./pages/Services";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ScheduleMyCleaning } from "./pages/ScheduleMyCleaning";
import { Payment } from "./pages/Payment";
import { Review } from "./pages/Review";
import { About } from "./pages/About";
import { ContactUs } from "./pages/Contact";
import { TermsCondition } from "./pages/TermsConditions";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { ErrorPage } from "./pages/ErrorPage";
import Calculator from "./components/Calculator";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/review" element={<Review />} />
              <Route path="/cal" element={<Calculator />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsCondition />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />

              {/* Protected route for Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/schedule-my-cleaning"
                element={<ScheduleMyCleaning />}
              />
              <Route path="/payment" element={<Payment />} />

              {/* Fallback for non-existing routes */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

// Protected route to handle authentication check
function ProtectedRoute({ children }) {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
