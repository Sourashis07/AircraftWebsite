import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import Aircraft from "./pages/Aircraft";
import AircraftDetails from "./pages/AircraftDetails";
import Tracker from "./pages/Tracker";
import FlightMap from './pages/FlightMap';
import { useNavigate } from "react-router-dom";
import News from "./pages/News";
import SkyGram from "./pages/SkyGram";
// Placeholder components
// const Aircraft = () => <div style={{ padding: "20px" }}><h2>Aircraft Page</h2></div>;
// const Tracker = () => <div style={{ padding: "20px" }}><h2>Live Flight Tracker</h2></div>;
// const News = () => <div style={{ padding: "20px" }}><h2>Aviation News</h2></div>;
const Learn = () => <div style={{ padding: "20px" }}><h2>Learn About Aircraft</h2></div>;


const App = () => {
  // const navigate = useNavigate();
  return (
    <Router>
      <nav className="navbar">
        <div className="logo">SkyBuddy</div>
        <ul className="nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/aircraft">Aircraft</a></li>
          {/* <li><a href="/tracker">Live Flight Tracker</a></li> */}
          <li><a href="/flight-map">Live Flight Tracker</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/learn">Learn</a></li>
          <li><Link to="http://localhost:3001" className="skygram-link">
            {/* <img src="/ai-icon.png" alt="AI" className="skygram-icon" /> */}
            SkyGram
          </Link></li>

        </ul>

      </nav>



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aircraft" element={<Aircraft />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/news" element={<News />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/aircraft/:id" element={<AircraftDetails />} />
        <Route path="/flight-map" element={<FlightMap />} />
        <Route path="/skygram" element={<SkyGram />} />

      </Routes>

      <footer className="footerclass">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="socials">
          <i>🐦</i>
          <i>📘</i>
          <i>📸</i>
        </div>
        <p>© 2025 SkyBuddy. All rights reserved.</p>
      </footer>

    </Router>

  );
};

export default App;
