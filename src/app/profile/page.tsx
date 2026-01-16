"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { loadUserProfile, UserProfile } from "@/utils/ProfileReader";
import { PENNYPRESS_ABI, CONTRACT_ADDRESS } from "@/constants";
import { formatEther } from "viem";
import { Loader2, Feather, BookOpen, DollarSign, Ban, User } from "lucide-react";
import Link from "next/link";


export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'created' | 'library' | 'stakes'>('created');

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isTxPending, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (address) {
      loadUserProfile(address).then((data) => {
        setProfile(data);
        setLoading(false);
      });
    }
  }, [address, isTxSuccess]);

  const handleUnstake = (articleId: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: "unstake",
      args: [articleId as `0x${string}`],
    });
  };

  const handleClaim = (articleId: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PENNYPRESS_ABI,
      functionName: "claimRewards",
      args: [articleId as `0x${string}`],
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
        <User size={48} className="text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-white">Wallet Not Connected</h2>
        <p>Please connect your wallet in the header to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-yellow-400" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20 text-slate-100">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-slate-900 border-b border-slate-800 pt-10 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center border-2 border-yellow-400 text-yellow-400 shadow-lg shadow-yellow-400/20">
              <User size={32} />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-1">My Profile</h1>
              <p className="text-slate-400 font-mono text-sm bg-slate-950 px-3 py-1 rounded-full border border-slate-800 inline-block">
                {address}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Earned</p>
              <p className="text-2xl font-bold text-yellow-400">{formatEther(BigInt(profile?.totalRevenue || 0))} ETH</p>
            </div>
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Staked</p>
              <p className="text-2xl font-bold text-white">{formatEther(BigInt(profile?.totalStaked || 0))} ETH</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="flex bg-slate-800 p-1 rounded-full w-full md:w-fit mb-8 shadow-lg border border-slate-700">
          {(['created', 'library', 'stakes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-yellow-400 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'created' && 'Created Articles'}
              {tab === 'library' && 'My Library'}
              {tab === 'stakes' && 'Investments'}
            </button>
          ))}
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* TAB 1: CREATED */}
          {activeTab === 'created' && profile?.created.map((article: any) => (
            <div key={article.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{article.title}</h3>
              <div className="flex justify-between text-sm text-slate-400 mb-4">
                <span>Reads: {article.reads}</span>
                <span>Staked: {formatEther(article.totalStaked)} ETH</span>
              </div>
              <Link href={`/article/${article.id}`}>
                <button className="w-full py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium">
                  View Article
                </button>
              </Link>
            </div>
          ))}

          {/* TAB 2: LIBRARY */}
          {activeTab === 'library' && profile?.library.map((article: any) => (
            <div key={article.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-yellow-400/50 transition-colors">
              <div className="absolute top-0 right-0 bg-yellow-400 text-slate-950 text-xs font-bold px-2 py-1 rounded-bl-lg">
                OWNED
              </div>
              <h3 className="text-lg font-bold text-white mb-4 line-clamp-1">{article.title}</h3>
              <Link href={`/article/${article.id}`} className="w-full">
                <button className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <BookOpen size={16} /> Read Now
                </button>
              </Link>
            </div>
          ))}

          {/* TAB 3: STAKES */}
          {activeTab === 'stakes' && profile?.stakes.map((article: any) => (
            <div key={article.id} className="bg-slate-900 border-2 border-slate-800 hover:border-yellow-400/70 rounded-xl p-6 transition-colors shadow-lg">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{article.title}</h3>
              <p className="text-xs text-slate-500 mb-4 font-mono">ID: {article.id.substring(0,8)}...</p>
              
              <div className="bg-slate-950 p-4 rounded-lg mb-4 border border-slate-800">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 text-sm">My Stake</span>
                  <span className="text-yellow-400 font-bold">{formatEther(article.myStake)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Total Pool</span>
                  <span className="text-white font-bold">{formatEther(article.totalStaked)} ETH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleClaim(article.id)}
                  disabled={isTxPending}
                  className="py-2 bg-slate-800 text-yellow-400 border border-yellow-400/30 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 font-bold disabled:opacity-50"
                >
                  <DollarSign size={16} /> Claim
                </button>
                <button 
                  onClick={() => handleUnstake(article.id)}
                  disabled={isTxPending}
                  className="py-2 bg-red-950/30 text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 font-bold"
                >
                  <Ban size={16} /> Unstake
                </button>
              </div>
            </div>
          ))}

          {/* EMPTY STATES */}
          {activeTab === 'created' && (!profile?.created || profile.created.length === 0) && (
            <div className="col-span-full text-center py-20 text-slate-500 italic">You haven't created any articles yet.</div>
          )}
          {activeTab === 'library' && (!profile?.library || profile.library.length === 0) && (
            <div className="col-span-full text-center py-20 text-slate-500 italic">You haven't purchased any articles yet.</div>
          )}
          {activeTab === 'stakes' && (!profile?.stakes || profile.stakes.length === 0) && (
            <div className="col-span-full text-center py-20 text-slate-500 italic">You haven't staked on any articles yet.</div>
          )}
          
        </div>
      </div>
    </div>
  );
}