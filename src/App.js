import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Homepage } from "./pages/Homepage";
import { Services } from "./pages/Services";
import { About } from "./pages/About"; // Import About page
import { Contact } from "./pages/Contact"; // Import Contact page
import Register from "./pages/Register"; // Corrected to default import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    const isAuthenticated = false; // Example: determine if the user is logged in

    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} /> {/* Pass the authentication status */}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} /> {/* Add About route */}
                <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
                <Route path="/register" element={<Register />} /> {/* Add Register route */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
