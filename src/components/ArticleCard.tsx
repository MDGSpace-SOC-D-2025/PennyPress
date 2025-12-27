import React from "react";
import { formatEther } from "viem";
import ReadButton from "./ReadButton";

const ArticleCard = ({ article }: { article: any }) => {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column p-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge rounded-pill px-3 fw-bold" style={{backgroundColor: 'var(--text-off-white)', color: 'var(--navy-bg)'}}>
            Article
          </span>
          <span className="text-accent fw-bold fs-5 font-monospace">
            {formatEther(BigInt(article.price))} ETH
          </span>
        </div>

        {/* TITLE */}
        <h4 className="card-title fw-bold text-white mb-2" style={{ letterSpacing: '-0.5px' }}>
            {article.title}
        </h4>

        {/* CREATOR */}
        <p className="card-subtitle text-muted-blue small mb-4 font-monospace">
          By {article.creator.slice(0, 6)}...{article.creator.slice(-4)}
        </p>

        {/* DESCRIPTION */}
        <p className="card-text text-white text-opacity-75 flex-grow-1 mb-4">
          {article.description?.length > 100 
            ? article.description.substring(0, 100) + "..." 
            : article.description}
        </p>

        {/* BUTTON ACTION */}
        <div className="mt-auto">
            <ReadButton 
                articleId={article.id} 
                price={formatEther(BigInt(article.price))}
                ipfsCid={article.ipfsCid}
                creator={article.creator}
            />
        </div>

      </div>
    </div>
  );
};

export default ArticleCard;