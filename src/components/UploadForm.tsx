"use client";
import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, stringToHex, keccak256 } from "viem";
import { lit } from "@/utils/lit";
import { PENNYPRESS_ABI, CONTRACT_ADDRESS } from "@/constants";

export default function UploadForm() {
  const { address } = useAccount();
  
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.05");
  
  const [status, setStatus] = useState("");
  const [ipfsCid, setIpfsCid] = useState("");
  const [articleId, setArticleId] = useState<string>("");

  const { data: hash, writeContract, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleUploadToIPFS = async () => {
    if (!file || !address) {
      setStatus("Please connect wallet and select a file");
      return;
    }

    setStatus("Encrypting & Uploading...");

    try {
      const tempId = keccak256(stringToHex(file.name + Date.now()));
      setArticleId(tempId);
      
      const encryptedData = await lit.encryptFile(file, tempId, address);
      
      // Bundle encrypted content + metadata
      const contentBundle = JSON.stringify({
        title,          
        description,    
        ciphertext: encryptedData.ciphertext,
        dataToEncryptHash: encryptedData.dataToEncryptHash,
        accessControlConditions: encryptedData.accessControlConditions,
        fileType: file.type 
      });

      // Upload to IPFS via Pinata
      const blob = new Blob([contentBundle], { type: 'application/json' });
      const formData = new FormData();
      formData.append("file", blob, "content.json");
      formData.append("metadata", JSON.stringify({ name: title }));

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      
      setIpfsCid(data.IpfsHash);
      
      // Now regenerate articleId using the actual IPFS CID
      const finalArticleId = keccak256(stringToHex(data.IpfsHash));
      setArticleId(finalArticleId);
      
      setStatus("IPFS Upload Complete! Ready to Register.");
      
    } catch (e) {
      console.error(e);
      setStatus("Error during upload: " + (e as Error).message);
    }
  };

  const handleRegister = () => {
    if (!ipfsCid || !title || !articleId) {
      setStatus("Missing required data");
      return;
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: "registerArticle",
      args: [articleId as `0x${string}`, parseEther(price), ipfsCid],
    });
  };

  return (
    <div className="w-full max-w-2xl bg-navy-card border border-navy-border rounded-2xl p-8 shadow-2xl"> 
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-xs font-bold text-yellow-accent uppercase tracking-wider mb-2">
            Title
          </label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-navy-bg border border-navy-border text-text-off-white rounded-lg p-3 focus:outline-none focus:border-yellow-accent transition-colors"
            placeholder="e.g., The Future of AI"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-yellow-accent uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-navy-bg border border-navy-border text-text-off-white rounded-lg p-3 h-32 focus:outline-none focus:border-yellow-accent transition-colors resize-none"
            placeholder="A short summary..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <label className="block text-xs font-bold text-yellow-accent uppercase tracking-wider mb-2">
               Price (ETH)
             </label>
             <input 
               type="number" 
               step="0.001" 
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               className="w-full bg-navy-bg border border-navy-border text-text-off-white rounded-lg p-3 focus:outline-none focus:border-yellow-accent transition-colors"
             />
          </div>
          <div>
            <label className="block text-xs font-bold text-yellow-accent uppercase tracking-wider mb-2">
              File (PDF)
            </label>
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-text-muted
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-xs file:font-bold
                file:bg-navy-bg file:text-yellow-accent
                file:border-solid file:border file:border-yellow-accent
                hover:file:bg-yellow-accent hover:file:text-navy-bg
                cursor-pointer transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={handleUploadToIPFS}
          disabled={!file || !address || !!ipfsCid || status.includes("Encrypting")}
          className={`w-full py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300
            ${ipfsCid 
              ? 'bg-green-500/10 text-green-400 border border-green-500 cursor-default' 
              : 'border border-yellow-accent text-yellow-accent hover:bg-yellow-accent hover:text-navy-bg'
            }
            ${(!file || !address) && 'opacity-50 cursor-not-allowed'}
          `}
        >
          {ipfsCid ? "✓ File Encrypted & Uploaded" : status || "1. Upload & Encrypt"}
        </button>

        {ipfsCid && (
          <button 
            onClick={handleRegister}
            disabled={isPending || isConfirming || isConfirmed}
            className="w-full py-4 bg-yellow-accent text-navy-bg font-extrabold rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "Check Wallet..." : isConfirming ? "Confirming..." : isConfirmed ? "Published! 🎉" : "2. Publish to Blockchain"}
          </button>
        )}
      </div>
      
      {isConfirmed && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500 rounded-xl text-center">
          <p className="text-green-400 font-bold mb-1">Success! Article Registered.</p>
          <p className="text-xs text-text-muted font-mono">Tx: {hash?.slice(0,10)}...</p>
          <p className="text-xs text-text-muted font-mono mt-1">Article ID: {articleId.slice(0,10)}...</p>
        </div>
      )}

      {/* Wallet Not Connected Warning */}
      {!address && (
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500 rounded-xl text-center">
          <p className="text-yellow-400 text-sm"> Please connect your wallet to upload articles</p>
        </div>
      )}
    </div>
  );
}