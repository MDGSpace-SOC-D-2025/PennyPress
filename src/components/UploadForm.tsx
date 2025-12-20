"use client";
import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, stringToHex, keccak256 } from "viem";
import { lit } from "@/utils/lit";
import { PENNYPRESS_ABI, CONTRACT_ADDRESS } from "@/constants";

export default function UploadForm() {
  const { address } = useAccount();
  
  // --- STATE ---
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.05");
  
  const [status, setStatus] = useState("");
  const [ipfsCid, setIpfsCid] = useState("");

  // --- BLOCKCHAIN HOOKS ---
  const { data: hash, writeContract, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // --- LOGIC 1: IPFS UPLOAD ---
  const handleUploadToIPFS = async () => {
    if (!file) return;
    setStatus("Encrypting & Uploading...");

    try {
      // 1. Encrypt the file using Lit Protocol
      const encryptedData = await lit.encryptFile(file);
      
      // 2. Prepare the bundle
      const contentBundle = JSON.stringify({
        title,          
        description,    
        ciphertext: encryptedData.ciphertext,
        dataToEncryptHash: encryptedData.dataToEncryptHash,
        accessControlConditions: encryptedData.accessControlConditions,
        fileType: file.type 
      });

      // 3. Upload to IPFS via your API route
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

  // --- LOGIC 2: BLOCKCHAIN REGISTER ---
  const handleRegister = () => {
    if (!ipfsCid || !title) return;

    // Create unique ID from the IPFS CID
    const articleId = keccak256(stringToHex(ipfsCid));

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: "registerArticle",
      args: [articleId, parseEther(price), ipfsCid],
    });
  };

  // --- STYLES ---
  const inputStyles = {
    backgroundColor: 'var(--navy-bg)',
    color: 'var(--text-off-white)',
    borderColor: 'var(--navy-border)',
    borderRadius: '8px',
    padding: '12px'
  };

  // --- RENDER ---
  return (
    <div className="card w-100 p-4 shadow-lg" style={{maxWidth: '600px'}}>

      {/* SECTION 1: Details */}
      <div className="mb-4">
        <div className="mb-3">
          <label className="text-accent text-uppercase small fw-bold mb-1" style={{letterSpacing: '1px'}}>Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            style={inputStyles}
            placeholder="e.g., The Future of AI"
          />
        </div>
        
        <div className="mb-3">
          <label className="text-accent text-uppercase small fw-bold mb-1" style={{letterSpacing: '1px'}}>Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            style={{ ...inputStyles, height: '100px' }}
            placeholder="A short summary..."
          />
        </div>

        <div className="row g-3">
          <div className="col-6">
             <label className="text-accent text-uppercase small fw-bold mb-1" style={{letterSpacing: '1px'}}>Price (ETH)</label>
             <input 
               type="number" 
               step="0.001" 
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               className="form-control"
               style={inputStyles}
             />
          </div>
          <div className="col-6">
            <label className="text-accent text-uppercase small fw-bold mb-1" style={{letterSpacing: '1px'}}>File</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="form-control"
              style={{ ...inputStyles, padding: '9px' }}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Actions */}
      <div className="d-flex flex-column gap-3">
        {/* Button A: Upload to IPFS */}
        <button 
          onClick={handleUploadToIPFS}
          disabled={!file || !!ipfsCid || status.includes("Encrypting")}
          className={`btn ${ipfsCid ? 'btn-success' : 'btn-outline-primary'} w-100 py-3 fw-bold`}
          style={{ borderRadius: '12px', textTransform: 'uppercase' }}
        >
          {ipfsCid ? "✓ File Encrypted & Uploaded" : status || "1. Upload & Encrypt"}
        </button>

        {/* Button B: Register on Chain */}
        {ipfsCid && (
          <button 
            onClick={handleRegister}
            disabled={isPending || isConfirming || isConfirmed}
            className="btn btn-primary w-100 py-3 fw-bold"
            style={{ borderRadius: '12px', textTransform: 'uppercase', boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
          >
            {isPending ? "Check Wallet..." : isConfirming ? "Confirming..." : isConfirmed ? "Published! 🎉" : "2. Publish to Blockchain"}
          </button>
        )}
      </div>

      {/* Confirmation Link */}
      {isConfirmed && (
        <div className="mt-4 p-3 border border-success rounded text-center" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
          <p className="text-success fw-bold mb-1">Success! Article Registered.</p>
          <p className="small text-muted-blue mb-0">Tx: {hash?.slice(0,10)}...</p>
        </div>
      )}
    </div>
  );
}