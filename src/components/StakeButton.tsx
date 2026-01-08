import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { PENNYPRESS_ABI, CONTRACT_ADDRESS } from '../constants';

interface StakeButtonProps {
  articleId: `0x${string}`;
}

export default function StakeButton({ articleId }: StakeButtonProps) {
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState('');

  const { 
    data: hash, 
    writeContract, 
    isPending: isWalletLoading, 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess 
  } = useWaitForTransactionReceipt({ hash });

  const handleStake = () => {
    if (!amount) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: 'stake',
      args: [articleId],
      value: parseEther(amount)
    });
  };

  if (isWalletLoading || isConfirming) {
    return (
      <button disabled className="w-full py-2 rounded-lg font-medium text-sm border border-text-muted text-text-muted cursor-not-allowed flex items-center justify-center gap-2 opacity-70">
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {isWalletLoading ? "Check Wallet..." : "Staking..."}
      </button>
    );
  }

  if (isSuccess) {
    return (
      <button disabled className="w-full py-2 rounded-lg font-bold text-sm bg-green-500/10 text-green-400 border border-green-500 cursor-default">
        Stake Successful!
      </button>
    );
  }

  if (showInput) {
    return (
      <div className="flex flex-col gap-3 p-3 rounded-xl bg-navy-bg border border-navy-border animate-fade-in">
        <div className="flex items-center bg-navy-card border border-navy-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-yellow-accent">
          <span className="px-3 text-text-muted text-sm font-bold bg-navy-border/30 h-full flex items-center">ETH</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            className="w-full bg-transparent text-white p-2 outline-none text-sm placeholder:text-text-muted"
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleStake}
            className="flex-1 py-1.5 rounded-lg bg-yellow-accent text-navy-bg text-sm font-bold hover:bg-[#e6c200] transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="px-3 py-1.5 rounded-lg border border-navy-border text-text-muted text-sm hover:text-white hover:border-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }


  return (
    <button 
      onClick={() => setShowInput(true)} 
      className="w-full py-2 rounded-lg font-medium text-sm text-text-muted border border-navy-border hover:border-yellow-accent hover:text-yellow-accent transition-all duration-300"
    >
      Stake ETH
    </button>
  );
}