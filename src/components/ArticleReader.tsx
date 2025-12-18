"use client";
import { useState, useEffect } from "react";
import { lit } from "@/utils/lit";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther, toHex, keccak256, toBytes } from "viem";
import { PENNYPRESS_ABI, CONTRACT_ADDRESS } from "@/constants";


// Helper to convert IPFS hash to HTTP URL
const getGatewayUrl = (cid: string) => `https://gateway.pinata.cloud/ipfs/${cid}`;

export default function ArticleReader({ articleId, price, ipfsCid, creatorAddress }: { articleId: string, price: string, ipfsCid: string, creatorAddress: string }) {
  const { address } = useAccount();
  const [content, setContent] = useState<Blob | null>(null);
  const [status, setStatus] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);

  // 1. THE UX CHECK (Ask Blockchain: Do I own this?)
  // We convert the articleId string to bytes32 format if needed by your contract
  const { data: hasAccess } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PENNYPRESS_ABI,
    functionName: "checkAccess",
    args: [articleId.startsWith("0x") ? (articleId as `0x${string}`): toHex(articleId),

        address as `0x${string}`
    ],
  });

  // Setup the "Buy" function
  const { writeContract, isPending: isBuying } = useWriteContract();

  const handleBuy = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: "payToAccess",
      args: [articleId.startsWith("0x") ? (articleId as `0x${string}`): toHex(articleId)], // In a real app, you'd pass the creator's address dynamically
      value: parseEther(price),
    });
  };

  const handleDecrypt = async () => {
    if (!address) return alert("Connect wallet first");
    setIsDecrypting(true);
    setStatus("Fetching encrypted bundle from IPFS...");

    try {
      // 2. FETCH THE BUNDLE
      // We download the JSON we created in UploadForm
      const response = await fetch(getGatewayUrl(ipfsCid));
      const bundle = await response.json();

      setStatus("Asking Lit Nodes for the key...");

      // 3. THE HANDSHAKE (Decrypt)
      // We assume your lit.ts has a 'decryptFile' function
      const decryptedFile = await lit.decryptFile(
        bundle.ciphertext,
        bundle.dataToEncryptHash,
        bundle.accessControlConditions,
        bundle.fileType
      );

      setStatus("Decryption successful! Loading Viewer...");
      setContent(decryptedFile);

    } catch (error) {
      console.error(error);
      setStatus("Decryption Failed: " + (error as Error).message);
    } finally {
      setIsDecrypting(false);
    }
  };

  // --- RENDER LOGIC ---

  // State A: User hasn't paid yet
  if (!hasAccess) {
    return (
      <div className="p-6 bg-gray-900 border border-red-900/50 rounded-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">🔒 Locked Article</h3>
        <p className="text-gray-400 mb-4">You need to purchase this article to read it.</p>
        <button 
          onClick={handleBuy}
          disabled={isBuying}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          {isBuying ? "Processing..." : `Buy for ${price} ETH`}
        </button>
      </div>
    );
  }

  // State B: Paid, but hasn't decrypted yet
  if (!content) {
    return (
      <div className="p-6 bg-gray-900 border border-green-900/50 rounded-xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">🔓 Access Granted</h3>
        <p className="text-gray-400 mb-4">You own this article. Decrypt it locally to read.</p>
        <button 
          onClick={handleDecrypt}
          disabled={isDecrypting}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          {isDecrypting ? status : "Decrypt & Read"}
        </button>
        {status && <p className="text-xs text-gray-500 mt-2 font-mono">{status}</p>}
      </div>
    );
  }

  // State C: Decrypted & Visible
  return (
    <div className="w-full mt-4">
      <div className="bg-gray-800 p-2 rounded-t-lg flex justify-between items-center">
        <span className="text-green-400 text-sm font-mono">● SECURE VIEW</span>
        <button onClick={() => setContent(null)} className="text-xs text-gray-400 hover:text-white">Close</button>
      </div>
      {/* We create a temporary URL for the decrypted blob to display it */}
      <iframe 
        src={URL.createObjectURL(content)} 
        className="w-full h-[600px] bg-white rounded-b-lg"
      />
    </div>
  );
}