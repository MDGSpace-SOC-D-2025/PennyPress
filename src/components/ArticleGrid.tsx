// ArticleGrid.tsx
"use client";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ArticleCard from "./ArticleCard";
import { loadArticles, ArticleData } from "./ArticleReader";

export default function ArticleGrid() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const data = await loadArticles(sortOption);

      setArticles(data);
      setLoading(false);
    };

    init();
  }, [sortOption]);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold text-white mb-0">Latest Articles</h2>
        
        <div className="d-flex align-items-center">
          <label className="text-white-50 me-2 small fw-bold">SORT BY:</label>
          <select 
            className="form-select form-select-sm bg-dark text-white border-secondary" 
            style={{ width: 'auto', minWidth: '160px' }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest"> Newest First</option>
            <option value="oldest"> Oldest First</option>
            <option value="most_staked"> Most Staked</option>
            <option value="popularity"> Popularity</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="text-center text-white py-5">
          <h3>No articles found.</h3>
        </div>
      )}

      {!loading && (
        <div className="row g-4">
          {articles.map((article) => (
            <div className="col-12 col-md-6 col-lg-4" key={article.id}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}