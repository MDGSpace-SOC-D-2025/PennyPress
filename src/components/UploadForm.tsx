"use client";
import { useState } from "react";
import { lit } from "@/utils/lit";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [ipfsCid, setIpfsCid] = useState("");

  const handleEncryptAndUpload = async () => {
    if (!file) return;
    setStatus("Encrypting file...");

    try {
      const encryptedData = await lit.encryptFile(file);
      setStatus("Uploading to IPFS via Pinata...");

      // --- CHANGE START ---
      // Instead of sending raw ciphertext, we create a Bundle
      const contentBundle = JSON.stringify({
        ciphertext: encryptedData.ciphertext,
        dataToEncryptHash: encryptedData.dataToEncryptHash,
        accessControlConditions: encryptedData.accessControlConditions,
        fileType: file.type // Store the original type (e.g., application/pdf)
      });

      const blob = new Blob([contentBundle], { type: 'application/json' });
      const formData = new FormData();
      formData.append("file", blob, "content.json");
      formData.append("metadata", JSON.stringify({ name: file.name })); // Simple metadata
      // --- CHANGE END ---

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      
      setIpfsCid(data.IpfsHash);
      setStatus("Success! Bundle CID: " + data.IpfsHash);

    } catch (error) {
      console.error(error);
      setStatus("Error: " + (error as Error).message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 max-w-md mt-8">
      <h2 className="text-xl text-white mb-4 font-bold">Creator Studio</h2>
      
      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-2">Select Article/PDF</label>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-gray-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
        />
      </div>

      <button 
        onClick={handleEncryptAndUpload}
        disabled={!file || status.includes("Uploading") || status.includes("Encrypting")}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 font-medium transition-all"
      >
        Encrypt & Upload to IPFS
      </button>

      {status && (
        <div className={`mt-4 p-3 rounded text-sm ${status.includes("Success") ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-300"}`}>
          {status}
        </div>
      )}

      {ipfsCid && (
        <div className="mt-2 text-xs text-gray-500 break-all font-mono bg-black p-2 rounded border border-gray-700">
          CID: {ipfsCid}
        </div>
      )}
    </div>
  );
}