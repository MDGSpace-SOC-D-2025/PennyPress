"use client";

import React, { useState, useEffect } from "react";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Latest Articles
        </h2>
        
        <div className="flex items-center bg-navy-card border border-navy-border rounded-lg p-1">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-3">
            Sort By:
          </label>
          <select 
            className="bg-navy-bg text-text-off-white text-sm font-medium border-none rounded-md py-2 pl-3 pr-8 focus:ring-1 focus:ring-yellow-accent cursor-pointer outline-none" 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most_staked">Most Staked</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-accent"></div>
        </div>
      )}
      {!loading && articles.length === 0 && (
        <div className="text-center py-20 border border-dashed border-navy-border rounded-xl">
          <h3 className="text-xl text-text-muted">No articles found.</h3>
          <p className="text-sm text-text-muted mt-2">Be the first to publish!</p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="h-full">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}