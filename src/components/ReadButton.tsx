"use client";
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { lit } from "@/utils/lit"; 
import { PENNYPRESS_ABI, CONTRACT_ADDRESS } from "@/constants";

interface ReadButtonProps {
  articleId: string; 
  price: string;
  ipfsCid: string;
  creator: string;
}

export default function ReadButton({ articleId, price, ipfsCid, creator }: ReadButtonProps) {
  const { address } = useAccount();
  
  const [status, setStatus] = useState("");
  const [forceUnlock, setForceUnlock] = useState(false);

  const { data: hasAccess, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PENNYPRESS_ABI,
    functionName: "checkAccess", 
    args: address ? [articleId as `0x${string}`, address] : undefined,
    query: {
      enabled: !!address, 
    }
  });

  
  const isCreator = address && creator && address.toLowerCase() === creator.toLowerCase();
  const canRead = hasAccess || isCreator || forceUnlock;

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isPaid } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isPaid) {
      setForceUnlock(true);
      refetch();
      setStatus("");
    }
  }, [isPaid, refetch]);

  const handlePay = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: "payToAccess",
      args: [articleId as `0x${string}`],
      value: parseEther(price),
    });
  };
  
  const handleRead = async () => {
    setStatus("Fetching encrypted data...");
    try {
      
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsCid}`);
      if (!response.ok) throw new Error("Failed to fetch from IPFS");
      const data = await response.json();

      setStatus("Decrypting...");

      const blob = await lit.decryptFile(
        data.ciphertext,
        data.dataToEncryptHash,
        data.accessControlConditions,
        data.fileType || "text/plain" 
      );

      setStatus("Opening...");
      
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      setStatus("");

    } catch (e) {
      console.error(e);
      setStatus("Decryption Failed. (Check console)");
    }
  };

  if (isPending || isConfirming) {
    return (
        <button disabled className="btn btn-primary w-100 disabled" style={{opacity: 0.7}}>
            <span className="spinner-border spinner-border-sm me-2"></span>
            {isPending ? "Check Wallet..." : "Confirming Payment..."}
        </button>
    );
  }

  if (status) {
    return (
        <button disabled className="btn btn-primary w-100 disabled" style={{opacity: 0.7}}>
            <span className="spinner-grow spinner-grow-sm me-2"></span>
            {status}
        </button>
    );
  }

  if (canRead) {
    return (
      <button 
        onClick={handleRead} 
        className="btn btn-primary w-100 shadow-sm fw-bold"
        style={{ 
            backgroundColor: '#00b894', 
            borderColor: '#00b894', 
            color: '#fff' 
        }}
      >
        🔓 Read Now {isCreator && "(Creator)"}
      </button>
    );
  }

  return (
    <button onClick={handlePay} className="btn btn-primary w-100 shadow-sm fw-bold">
       Buy for {price} ETH
    </button>
  );
}