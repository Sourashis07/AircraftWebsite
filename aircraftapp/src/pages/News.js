import React, { useEffect, useState } from "react";
import axios from "axios";
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("en");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [query, language, sortBy, page]);

  const fetchNews = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/aviation-news", {
      params: {
        q: query || "aviation",
        language,
        sortBy,
        page,
        pageSize: 10,
      }
    })
    .then(res => setArticles(res.data))
    .catch(err => console.error("Failed to load news:", err))
    .finally(() => setLoading(false));
  };

  return (
    <div className="news-layout">
      <div className="news-sidebar">
        <h2>News Filters</h2>

        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <label>Language:</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
        </select>

        <label>Sort by:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="publishedAt">Date</option>
          <option value="relevancy">Relevance</option>
          <option value="popularity">Popularity</option>
        </select>

        <div className="pagination">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </div>

      <div className="news-content">
        <h2>Latest Aviation News</h2>
        {loading ? <p>Loading...</p> : (
          <div className="news-scroll">
            {articles.map((article, i) => (
              <a href={article.url} target="_blank" rel="noopener noreferrer" key={i} className="news-rect-card">
                <img src={article.urlToImage} alt={article.title} />
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.description?.substring(0, 100)}...</p>
                  <p className="source">{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;