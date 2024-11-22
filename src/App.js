import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Homepage } from "./pages/Homepage";
import { Services } from "./pages/Services";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { About } from "./pages/About";
import { ContactUs } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsCondition } from "./pages/TermsConditions";
import { ErrorPage } from "./pages/ErrorPage";
import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
return (
<Router>
    <div className="App">
        <Header />
        <main>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsCondition />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<ErrorPage />} />

            </Routes>
        </main>
        <Footer />
    </div>
</Router>
);
}

export default App;
