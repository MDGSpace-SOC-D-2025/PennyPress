import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ArticleCard from "./ArticleCard";

const DummyArticles = [
  { id: 1, title: "Article 1", summary: "Summary of Article 1", author: "Author 1" },
  { id: 2, title: "Article 2", summary: "Summary of Article 2", author: "Author 2" },
  { id: 3, title: "Article 3", summary: "Summary of Article 3", author: "Author 3" },
  { id: 4, title: "Article 4", summary: "Summary of Article 4", author: "Author 4" },
];

const ArticleGrid = () => {
  return (
    <div>  
      <div className="container-fluid py-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {DummyArticles.map((article) => (
                <div className="col" key={article.id}>
                    <ArticleCard article ={article}/>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleGrid;