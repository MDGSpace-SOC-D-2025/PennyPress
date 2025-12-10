"use client";

import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { parseEther, stringToHex } from "viem";
import { PENNYPRESS_ABI, CONTRACT_ADDRESS } from "@/constants";
import { useEffect } from "react";

interface ArticleProps {
  id: string;
  title: string;
  preview: string;
  price: string;
}

export default function ArticleCard({ id, title, preview, price }: ArticleProps) {
  const { isConnected } = useAccount();

  const { 
    data: hash, 
    writeContract, 
    isPending: isWritePending,
    error: writeError 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleUnlock = () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    const contentId = stringToHex(id, { size: 32 });

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: "payToAccess",
      args: [contentId],
      value: parseEther(price), 
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-md shadow-xl">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          {preview}... <span className="text-gray-600 italic">(content locked)</span>
        </p>
      </div>

      <div className="flex items-center justify-between mt-6 border-t border-gray-700 pt-4">
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs uppercase tracking-wider">Price</span>
          <span className="text-emerald-400 font-mono font-bold">{price} ETH</span>
        </div>

        {isConfirmed ? (
          <button 
            disabled 
            className="bg-emerald-500/20 text-emerald-400 px-6 py-2 rounded-lg font-medium border border-emerald-500/50"
          >
            Unlocked! 🔓
          </button>
        ) : (
          <button
            onClick={handleUnlock}
            disabled={isWritePending || isConfirming}
            className={`
              px-6 py-2 rounded-lg font-medium transition-all duration-200
              ${isWritePending || isConfirming 
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/20"
              }
            `}
          >
            {isWritePending ? "Check Wallet..." : isConfirming ? "Confirming..." : "Unlock Now 🔒"}
          </button>
        )}
      </div>

      {writeError && (
        <div className="mt-3 text-red-400 text-xs bg-red-900/20 p-2 rounded">
          Error: {writeError.message.split(".")[0]}
        </div>
      )}
    </div>
  );
}