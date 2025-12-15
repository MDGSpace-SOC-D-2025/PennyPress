"use client";
import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, stringToHex, keccak256, toHex } from "viem";
import { lit } from "@/utils/lit";
import { PENNYPRESS_ABI, CONTRACT_ADDRESS } from "@/constants";

export default function UploadForm() {
  const { address } = useAccount();
  
  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.05");
  
  // System State
  const [status, setStatus] = useState("");
  const [ipfsCid, setIpfsCid] = useState("");

  // Blockchain Hook
  const { data: hash, writeContract, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Step 1: Encrypt & Upload to IPFS
  const handleUploadToIPFS = async () => {
    if (!file) return;
    setStatus("Encrypting & Uploading...");

    try {
      // A. Encrypt
      const encryptedData = await lit.encryptFile(file);
      
      // B. Create Bundle
      const contentBundle = JSON.stringify({
        title,           // Store title in IPFS for easy retrieval later
        description,     // Store desc in IPFS
        ciphertext: encryptedData.ciphertext,
        dataToEncryptHash: encryptedData.dataToEncryptHash,
        accessControlConditions: encryptedData.accessControlConditions,
        fileType: file.type 
      });

      // C. Upload
      const blob = new Blob([contentBundle], { type: 'application/json' });
      const formData = new FormData();
      formData.append("file", blob, "content.json");
      formData.append("metadata", JSON.stringify({ name: title }));

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      
      setIpfsCid(data.IpfsHash);
      setStatus("IPFS Upload Complete! Ready to Register.");
      
    } catch (e) {
      console.error(e);
      setStatus("Error during upload.");
    }
  };

  // Step 2: Register on Blockchain
  const handleRegister = () => {
    if (!ipfsCid || !title) return;

    // Generate a unique ID based on the IPFS CID (This ensures 1-to-1 mapping)
    // We convert the string CID to a 32-byte hex string
    const articleId = keccak256(toHex(ipfsCid));

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: "registerArticle",
      args: [articleId, parseEther(price)],
    });
  };

  return (
    <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
      
      {/* SECTION 1: Details */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs text-gray-500 uppercase">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
            placeholder="e.g., The Future of AI"
          />
        </div>
        
        <div>
          <label className="text-xs text-gray-500 uppercase">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none h-24"
            placeholder="A short summary..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
             <label className="text-xs text-gray-500 uppercase">Price (ETH)</label>
             <input 
               type="number" 
               step="0.001" 
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               className="w-full bg-black border border-gray-700 rounded p-3 text-white"
             />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase">File</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-400 file:mr-2 file:py-2 file:px-4 file:rounded-full file:bg-gray-800 file:text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Actions */}
      <div className="space-y-3">
        {/* Button A: Upload to IPFS */}
        <button 
          onClick={handleUploadToIPFS}
          disabled={!file || !!ipfsCid || status.includes("Encrypting")}
          className={`w-full py-3 rounded-lg font-bold transition-all ${ipfsCid ? 'bg-green-900/30 text-green-400' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
        >
          {ipfsCid ? "✓ File Uploaded to IPFS" : status || "1. Upload & Encrypt"}
        </button>

        {/* Button B: Register on Chain */}
        {ipfsCid && (
          <button 
            onClick={handleRegister}
            disabled={isPending || isConfirming || isConfirmed}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-bold transition-all"
          >
            {isPending ? "Open Wallet..." : isConfirming ? "Confirming..." : isConfirmed ? "Published! 🎉" : "2. Publish to Blockchain"}
          </button>
        )}
      </div>

      {/* Confirmation Link */}
      {isConfirmed && (
        <div className="mt-4 p-4 bg-green-900/20 border border-green-900 rounded text-center">
          <p className="text-green-400">Success! Article Registered.</p>
          <p className="text-xs text-gray-500 mt-1">Tx Hash: {hash?.slice(0,10)}...</p>
        </div>
      )}
    </div>
  );
}