import React from "react";
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Aircraft from "./Aircraft";
import FlightMap from "./FlightMap";


const manufacturers = [
  { name: "Airbus", logo: "/images/airbus.png" },
  { name: "Boeing", logo: "/images/boeing.jpg" },
  { name: "Embraer", logo: "/images/embraer.jpg" },
  { name: "Lockheed Martin", logo: "/images/lockheed.png" },
  { name: "COMAC", logo: "/images/comac.png" },
  { name: "Cessna", logo: "/images/cessna.webp" },
];

const aircraftModels = [
  { name: "B777", desc: "Versatile for medium-range flights", img: "/images/b777.jpg" },
  { name: "B747", desc: "High-performance long-range aircraft", img: "/images/b747.jpg" },
  { name: "A380", desc: "Advanced technology aircraft", img: "/images/a380.jpg" },
  { name: "SR-71 Blackbird", desc: "High-speed reconnaissance aircraft", img: "/images/sr71.jpg" },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      {/* Hero */}
      <section className="hero">
        <img src="/images/hero-plane.jpg" alt="Plane" className="hero-image" />
        <div className="hero-text">
          <h1>Explore the World of Aviation</h1>
          <p>Discover the latest in aircraft technology, track live flights, and stay updated with aviation news.</p>
          <button onClick={() => navigate("/aircraft")}>
            Explore Aircraft
          </button>
          <button className="btn-primary" onClick={() => navigate("/flight-map")}>
            Live-Flight Map
          </button>
        </div>
      </section>

      {/* Manufacturers */}
      <section className="section">
        <h2 className="section-title">Top Manufacturers</h2>
        <div className="card-grid">
          {manufacturers.map((mfr) => (
            <div key={mfr.name} className="card" onClick={() => navigate(`/manufacturer/${mfr.name.toLowerCase()}`)}>
              <img src={mfr.logo} alt={mfr.name} />
            </div>
          ))}
        </div>
      </section>

      {/* Models */}
      <section className="section">
        <h2 className="section-title">Popular Aircraft Models</h2>
        <div className="card-grid models">
          {aircraftModels.map((model) => (
            <div key={model.name} className="model-card" onClick={() => navigate(`/aircraft/${model.name.toLowerCase().replace(/ /g, '-')}`)}>
              <img src={model.img} alt={model.name} />
              <div className="model-info">
                <h4>{model.name}</h4>
                <p>{model.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section how-it-works">
        <h2 className="section-title">How Aircraft Work</h2>
        <div className="how-content">
          <img src="/images/aircraft-diagram.jpg" alt="Aircraft diagram" />
          <div>
            <h3>Learn the Basics of Aircraft</h3>
            <p>Explore the fundamental principles behind aircraft design and operation.</p>
            <button onClick={() => navigate('/learn')}>Learn More</button>
          </div>
        </div>
      </section>


      {/* News
      <section>
        <h2>Latest Aviation News</h2>
        <div className="news">
          <div>
            <h4>New Aircraft Design Unveiled</h4>
            <p>A leading manufacturer introduces a revolutionary aircraft design with enhanced fuel efficiency.</p>
          </div>
          <img src="/images/news-plane.jpg" alt="News Plane" />
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer>
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
        <p>© 2023 SkyBuddy. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;
