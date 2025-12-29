"use client";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ArticleCard from "./ArticleCard";
import { loadArticles, ArticleData } from "./ArticleReader";

export default function ArticleGrid() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const data = await loadArticles();
      setArticles(data);
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center text-white py-5">
        <h3>No articles found.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4"> 
        {articles.map((article) => (
          <div className="col-12 col-md-6 col-lg-4" key={article.id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}