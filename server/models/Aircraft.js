const mongoose = require("mongoose");

const AircraftSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  price: Number,
  capacity: Number,
  range: Number,
  image: String,
  description: String
}, {
  collection: 'aircraftss' // 👈 force it to use the "aircraftss" collection
});

module.exports = mongoose.model("Aircraft", AircraftSchema);
