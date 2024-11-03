import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Homepage } from "./pages/Homepage";
import { Services } from "./pages/Services";
import { Register } from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
