"use client";

import ArticleReader from "./ArticleReader";

interface ArticleProps {
  id: string;            // The Article ID (e.g., "article-1")
  title: string;
  preview: string;       // Short description
  price: string;         // e.g., "0.05"
  ipfsCid: string;       // <--- NEW: Needed for decryption
  creatorAddress: string; // <--- NEW: Needed for payment
}

export default function ArticleCard({ 
  id, 
  title, 
  preview, 
  price, 
  ipfsCid, 
  creatorAddress 
}: ArticleProps) {

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 max-w-md shadow-xl flex flex-col h-full">
      
      {/* 1. Header Section (Visuals Only) */}
      <div className="p-6 pb-2 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-white leading-tight">{title}</h2>
          <span className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded">
             #{id.slice(0, 4)}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {preview}
        </p>

        {/* Creator Badge */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
           <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
           <span className="font-mono">
             By {creatorAddress.slice(0, 6)}...{creatorAddress.slice(-4)}
           </span>
        </div>
      </div>

      {/* 2. The Logic Section (Delegated to Reader) */}
      {/* This component will automatically decide if it should show:
          A. The "Buy" Button (if locked)
          B. The "Decrypt" Button (if paid)
          C. The PDF Viewer (if decrypted) 
      */}
      <div className="bg-gray-900/50 border-t border-gray-700 p-4">
        <div className="flex justify-between items-center mb-4 px-2">
           <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Price</span>
           <span className="text-emerald-400 font-mono font-bold text-lg">{price} ETH</span>
        </div>

        <ArticleReader 
          articleId={id}
          price={price}
          ipfsCid={ipfsCid}
          creatorAddress={creatorAddress}
        />
      </div>

    </div>
  );
}