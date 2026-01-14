import React from "react";
import { formatEther } from "viem";
import ReadButton from "./ReadButton";
import StakeButton from "./StakeButton";
import { ArticleData } from "./ArticleReader";

const ArticleCard = ({ article }: { article: ArticleData }) => {
  return (
    <div className="flex flex-col h-full bg-navy-card border border-navy-border rounded-2xl p-6 shadow-lg transition-all duration-300 hover:translate-y-[-4px] hover:border-yellow-accent/50">
      <div className="flex justify-between items-center mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-navy-bg text-text-muted border border-navy-border">
          {formatEther(BigInt(article.totalStaked) * BigInt(10000))} PT Staked
        </span>
        <span className="font-mono font-bold text-yellow-accent text-sm">
          {formatEther(BigInt(article.price) * BigInt(10000))} PT
        </span>
      </div>

      <h4 className="text-xl font-bold text-white mb-2 leading-tight">
          {article.title}
      </h4>

      <p className="text-xs font-mono text-text-muted mb-4 opacity-70">
        By {article.creator.slice(0, 6)}...{article.creator.slice(-4)}
      </p>

      <p className="text-sm text-text-off-white flex-grow mb-6 line-clamp-3">
        {article.description}
      </p>

      <div className="flex flex-col gap-3 mt-auto">
          <ReadButton 
              articleId={article.id as `0x${string}`} 
              price={formatEther(BigInt(article.price))}
              ipfsCid={article.ipfsCid}
              creator={article.creator}
          />
          <StakeButton articleId={article.id as `0x${string}`} />
      </div>
    </div>
  );
};

export default ArticleCard;