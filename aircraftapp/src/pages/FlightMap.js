import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './FlightMap.css';
const { BaseLayer } = LayersControl;


// Fix Leaflet default marker icon bug in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png")
// });
const planeIcon = L.divIcon({
  html: '✈️',
  className: 'plane-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});




const FlightMap = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("flight");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);


  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://opensky-network.org/api/states/all");
      const filtered = response.data.states
        .filter(f => f[5] && f[6]) // Ensure longitude & latitude exist
        .map(f => ({
          icao24: f[0],
          callsign: f[1]?.trim(),
          origin_country: f[2],
          longitude: f[5],
          latitude: f[6],
          velocity: f[9],
          altitude: f[7],
          heading: f[10]
        }));
      setFlights(filtered.slice(0, 100)); // Limit to 100 aircrafts for performance
    } catch (err) {
      console.error("Error fetching flight data:", err);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
  if (!searchInput) return;
  setLoading(true);
  try {
    const response = await axios.get("http://localhost:5000/api/search", {
      params: {
        type: searchType,
        q: searchInput
      }
    });
    setSearchResults(response.data);
  } catch (error) {
    console.error("Search error:", error);
    setSearchResults({ error: "Search failed" });
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="flight-map-container">
      <div className="tracker-sidebar">
        <h3>Flight/Airport Search</h3>

        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="flight">By Flight Number</option>
          
          <option value="aircraft">By Aircraft Registration</option>
        </select>

        <input
          type="text"
          placeholder={searchType === 'flight' ? "e.g. AA100" : "e.g. JFK"}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        <div className="search-results">
          {loading && <p>Loading...</p>}
          {searchResults && (
            <pre>{JSON.stringify(searchResults, null, 2)}</pre>
          )}
        </div>
      </div>

      
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <MapContainer center={[20, 0]} zoom={2} minZoom={2} maxZoom={10} className="leaflet-container">
          
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>

            {/* <BaseLayer name="Satellite View">
          <TileLayer url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
        </BaseLayer> */}

            <BaseLayer name="Terrain View">
              <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
            </BaseLayer>
          </LayersControl>
          {flights.map((flight, index) => (
            <Marker key={index} position={[flight.latitude, flight.longitude]} icon={planeIcon}>
              <Popup>
                <strong>{flight.callsign || "Unknown"}</strong><br />
                Country: {flight.origin_country}<br />
                Altitude: {flight.altitude ? `${Math.round(flight.altitude)} m` : "N/A"}<br />
                Speed: {flight.velocity ? `${Math.round(flight.velocity)} m/s` : "N/A"}<br />
                Heading: {flight.heading ? `${Math.round(flight.heading)}°` : "N/A"}
              </Popup>
            </Marker>

          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default FlightMap;
