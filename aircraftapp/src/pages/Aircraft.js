import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Aircraft.css";

const Aircraft = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [manufacturerFilter, setManufacturerFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [range, setRange] = useState([0, 20000]);
  const [price, setPrice] = useState([0, 600000000]);
  const [capacity, setCapacity] = useState([0, 1000]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [flightDistance, setFlightDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [distanceResult, setDistanceResult] = useState(null);


  const getCoordinates = async (city) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`,
      {
        headers: {
          "User-Agent": "SkyBuddyAircraftApp/1.0 (your-email@example.com)"
        }
      }
    );
    const data = await response.json();
    if (!data.length) throw new Error(`City "${city}" not found.`);
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  };



  const toRad = (value) => (value * Math.PI) / 180;

  const calculateGreatCircleDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lon - coord1.lon);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };


  const handleDistanceFilter = async () => {
    try {
      setLoading(true);
      setDistanceResult(null);
      const coordFrom = await getCoordinates(fromCity);
      const coordTo = await getCoordinates(toCity);
      const distance = calculateGreatCircleDistance(coordFrom, coordTo);
      setFlightDistance(distance);
      setDistanceResult(distance.toFixed(2));
    } catch (err) {
      alert("Error calculating distance: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    axios.get("http://localhost:5000/api/aircrafts")
      .then(response => setAircrafts(response.data))
      .catch(error => console.error("Error fetching aircraft data:", error));
  }, []);

  const manufacturers = ["All", ...new Set(aircrafts.map(ac => ac.manufacturer))];

  const filtered = aircrafts
    .filter(ac =>
      ac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ac.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(ac =>
      (manufacturerFilter === "All" || ac.manufacturer === manufacturerFilter) &&
      ac.range >= range[0] && ac.range <= range[1] &&
      ac.price >= price[0] && ac.price <= price[1] &&
      ac.capacity >= capacity[0] && ac.capacity <= capacity[1]
    )
    .filter(ac => {
      const matchManufacturer =
        manufacturerFilter === "All" || ac.manufacturer === manufacturerFilter;
      const matchDistance =
        !flightDistance || ac.range >= flightDistance;

      return matchManufacturer && matchDistance;
    });

  const paginatedAircrafts = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="aircraft-page">
      {/* Sidebar */}
      <div className="filters">
        {/* Search Bar */}
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by name or manufacturer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>

        <div className="sidebar">
          <h3>Search</h3>
          <input
            type="text"
            placeholder="From City"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="To City"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <button onClick={handleDistanceFilter}>Go</button>
          {loading && <div className="loading-spinner"></div>}

          {distanceResult && (
            <div className="distance-result">
              Distance: <strong>{distanceResult} km</strong>
            </div>
          )}
        </div>

        {/* Manufacturer Filter */}
        <div className="filter-group">
          <h4>Manufacturer</h4>
          <div className="manufacturer-list">
            {manufacturers.map(m => (
              <label key={m} className="radio-label">
                <input
                  type="radio"
                  value={m}
                  checked={manufacturerFilter === m}
                  onChange={() => setManufacturerFilter(m)}
                />
                {m}
              </label>
            ))}
          </div>
        </div>

        {/* Other Filters */}
        <div className="filter-group">
          <label>Range (km): {range[0]} - {range[1]}</label>
          <input type="range" min="0" max="20000" step="1000"
            value={range[1]}
            onChange={(e) => setRange([0, parseInt(e.target.value)])} />
        </div>
        <div className="filter-group">
          <label>Price ($): {price[0].toLocaleString()} - {price[1].toLocaleString()}</label>
          <input type="range" min="0" max="600000000" step="10000000"
            value={price[1]}
            onChange={(e) => setPrice([0, parseInt(e.target.value)])} />
        </div>
        <div className="filter-group">
          <label>Capacity: {capacity[0]} - {capacity[1]}</label>
          <input type="range" min="0" max="1000" step="10"
            value={capacity[1]}
            onChange={(e) => setCapacity([0, parseInt(e.target.value)])} />
        </div>
      </div>

      {/* Aircraft Results */}
      <div className="aircraft-results">
        {paginatedAircrafts.map(ac => (
          <Link to={`/aircraft/${ac._id}`} key={ac._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="aircraft-card-modern">
              <img src={ac.image} alt={ac.name} />
              <div className="card-details">
                <h3>{ac.name}</h3>
                <p><strong>Manufacturer:</strong> {ac.manufacturer}</p>
                <p><strong>Capacity:</strong> {ac.capacity}</p>
                <p><strong>Range:</strong> {ac.range} km</p>
                <p><strong>Price:</strong> ${ac.price.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aircraft;
