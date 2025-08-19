const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const newsRoutes = require('./routes/news');
const searchRoute = require("./routes/search");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', newsRoutes);
app.use("/api/search", searchRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const aircraftRoutes = require('./routes/aircraft');
app.use('/api/aircrafts', aircraftRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
