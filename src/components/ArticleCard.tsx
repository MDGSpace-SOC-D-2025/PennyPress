// ArticleCard.tsx
import React from "react";
import { formatEther } from "viem";
import ReadButton from "./ReadButton";
import StakeButton from "./StakeButton";
import { ArticleData } from "./ArticleReader";

const ArticleCard = ({ article }: { article: ArticleData }) => {
  return (
    <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: '#1e293b' }}>
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge rounded-pill px-3 py-2 fw-bold" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#cbd5e1' }}>
            {formatEther(BigInt(article.totalStaked) * BigInt(10000))} PT Staked
          </span>
          <span className="fw-bold font-monospace" style={{ color: '#64ffda' }}>
            Price: {formatEther(BigInt(article.price) * BigInt(10000))} PT
          </span>
        </div>

        <h4 className="card-title fw-bold text-white mb-2" style={{ letterSpacing: '-0.5px' }}>
            {article.title}
        </h4>

        <p className="card-subtitle small mb-4 font-monospace" style={{ color: '#94a3b8' }}>
          By {article.creator.slice(0, 6)}...{article.creator.slice(-4)}
        </p>

        <p className="card-text text-white text-opacity-75 flex-grow-1 mb-4">
          {article.description}
        </p>

        <div className="d-grid gap-2 mt-auto">
            <ReadButton 
                articleId={article.id as `0x${string}`} 
                price={formatEther(BigInt(article.price))}
                ipfsCid={article.ipfsCid}
                creator={article.creator}
            />
            <StakeButton articleId={article.id as `0x${string}`} />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;