import React, { useEffect, useState } from "react";
import axios from "axios";
import './Tracker.css';

const Tracker = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://opensky-network.org/api/states/all");
      const flightData = response.data.states.map(f => ({
        icao24: f[0],
        callsign: f[1],
        origin_country: f[2],
        time_position: f[3],
        last_contact: f[4],
        longitude: f[5],
        latitude: f[6],
        baro_altitude: f[7],
        velocity: f[9],
        heading: f[10],
      }));
      setFlights(flightData.slice(0, 30)); // just first 30 for UI
    } catch (err) {
      console.error("Failed to fetch flight data:", err);
    }
    setLoading(false);
  };

  return (
    <div className="tracker-container">
      <h2>Live Flight Tracker</h2>
      {loading ? <div className="loading-spinner"></div> : (
        <div className="flight-list">
          {flights.map((flight, index) => (
            <div className="flight-card" key={index}>
              <h3>{flight.callsign || "N/A"}</h3>
              <p><strong>Country:</strong> {flight.origin_country}</p>
              <p><strong>Coordinates:</strong> {flight.latitude?.toFixed(2)}, {flight.longitude?.toFixed(2)}</p>
              <p><strong>Altitude:</strong> {flight.baro_altitude ? `${Math.round(flight.baro_altitude)} m` : "N/A"}</p>
              <p><strong>Speed:</strong> {flight.velocity ? `${Math.round(flight.velocity)} m/s` : "N/A"}</p>
              <p><strong>Heading:</strong> {flight.heading ? `${Math.round(flight.heading)}°` : "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tracker;
