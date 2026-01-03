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
    error: writeError 
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
      <button disabled className="btn btn-primary w-100 disabled" style={{ opacity: 0.7 }}>
        <span className="spinner-border spinner-border-sm me-2"></span>
        {isWalletLoading ? "Check Wallet..." : "Confirming Stake..."}
      </button>
    );
  }

  if (isSuccess) {
    return (
      <button disabled className="btn btn-primary w-100 disabled" style={{ opacity: 0.7 }}>
        <span className="spinner-grow spinner-grow-sm me-2"></span>
        Stake Successful!
      </button>
    );
  }

  if (showInput) {
    return (
      <div className="d-flex flex-column gap-2 p-2 border rounded bg-light shadow-sm">
        <div className="input-group">
          <span className="input-group-text text-muted">ETH</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            className="form-control"
            autoFocus
          />
        </div>
        
        <div className="d-flex gap-2">
          <button
            onClick={handleStake}
            className="btn btn-primary flex-grow-1 fw-bold"
            style={{ backgroundColor: '#00b894', borderColor: '#00b894' }} 
          >
            Confirm
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="btn btn-outline-secondary"
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
      className="btn btn-primary w-100 shadow-sm fw-bold"
      style={{ backgroundColor: '#6c5ce7', borderColor: '#6c5ce7' }} 
    >
      🔥 Stake ETH
    </button>
  );
}