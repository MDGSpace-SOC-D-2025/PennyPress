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
        <button disabled className="w-full py-2.5 rounded-full font-bold uppercase bg-yellow-accent/50 text-navy-bg cursor-not-allowed flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-navy-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {isPending ? "Check Wallet..." : "Confirming..."}
        </button>
    );
  }

  if (status) {
    return (
        <button disabled className="w-full py-2.5 rounded-full font-bold uppercase bg-navy-bg border border-yellow-accent text-yellow-accent cursor-wait flex items-center justify-center gap-2">
            <span className="animate-pulse h-2 w-2 bg-yellow-accent rounded-full"></span>
            {status}
        </button>
    );
  }

  if (canRead) {
    return (
      <button 
        onClick={handleRead} 
        className="w-full py-2.5 rounded-full font-bold uppercase 
                   bg-navy-bg border-2 border-yellow-accent text-yellow-accent 
                   shadow-[0_0_10px_rgba(255,215,0,0.1)] 
                   hover:bg-yellow-accent hover:text-navy-bg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] 
                   transition-all duration-300 transform hover:scale-[1.02]"
      >
         Read Now {isCreator && "(Creator)"}
      </button>
    );
  }

  return (
    <button 
      onClick={handlePay} 
      className="w-full py-2.5 rounded-full font-bold uppercase bg-yellow-accent text-navy-bg hover:bg-[#e6c200] hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all duration-300 transform hover:scale-[1.02]"
    >
       Buy for {price} ETH
    </button>
  );
}