import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

const ArticleCard = ({ article } : {article: any}) => {
  return (
    <>
      <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          By {article.author}
        </h6>
        <p className="card-text">
          {article.summary}
        </p>
        <button className="btn btn-primary mt-auto">
          Read Article
        </button>
      </div>
      <div className="card-footer text-muted">
        <small>Category Tag</small>
      </div>
    </div>
    </>
  );
};

export default ArticleCard;