import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AircraftDetails = () => {
  const { id } = useParams();
  const [aircraft, setAircraft] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/aircrafts/${id}`)
      .then(res => setAircraft(res.data))
      .catch(err => console.error("Aircraft not found", err));
  }, [id]);

  if (!aircraft) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{aircraft.name}</h1>
      <img src={aircraft.image} alt={aircraft.name} style={{ width: '500px', borderRadius: '10px' }} />
      <p><strong>Manufacturer:</strong> {aircraft.manufacturer}</p>
      <p><strong>Capacity:</strong> {aircraft.capacity}</p>
      <p><strong>Range:</strong> {aircraft.range} km</p>
      <p><strong>Price:</strong> ${aircraft.price.toLocaleString()}</p>
      <p>{aircraft.description}</p>
    </div>
  );
};

export default AircraftDetails;
