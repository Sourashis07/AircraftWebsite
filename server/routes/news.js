const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/aviation-news', async (req, res) => {
  const { q = "aviation", language = "en", sortBy = "publishedAt", page = 1, pageSize = 10 } = req.query;

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q,
        language,
        sortBy,
        page,
        pageSize,
        apiKey:'b0068f9aa3c0486fbd7f465644b12fdf'
      }
    });

    res.json(response.data.articles);
  } catch (error) {
    console.error("News API error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
