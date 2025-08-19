const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const API_KEY = process.env.AVIATION_API_KEY;
const BASE_URL = "https://aerodatabox.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com"
};

router.get("/", async (req, res) => {
  const { type, query } = req.query;

  try {
    let url = "";

    switch (type) {
      case "flight":
        // Replace with today's date or allow custom
        url = `${BASE_URL}/flights/number/${query}/2024-06-23`;
        break;

      case "airport":
        url = `${BASE_URL}/airports/icao/${query}`;
        break;

      case "aircraft":
        url = `${BASE_URL}/aircrafts/${query}`;
        break;

      default:
        return res.status(400).json({ error: "Invalid search type." });
    }

    const response = await axios.get(url, { headers });
    res.json(response.data);

  } catch (err) {
    console.error("Search API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Search failed." });
  }
});

module.exports = router;
