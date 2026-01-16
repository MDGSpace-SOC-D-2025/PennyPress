"use client"; 

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";
import { User } from "lucide-react"; // New icon for Profile
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-navy-950 border-navy-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* --- LOGO --- */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/Logo.png" 
                alt="PennyPress Logo"
                className="h-10 w-auto object-contain" 
              />
              <span className="font-bold text-xl text-white tracking-tight hidden md:block group-hover:text-gold transition-colors">
                PennyPress
              </span>
            </Link>
          </div>

          {/* --- ACTIONS --- */}
          <div className="flex items-center gap-3">
            
            {/* 1. GitHub Link */}
            <a
              href="https://github.com/MDGSpace-SOC-D-2025/PennyPress"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border border-transparent text-slate-300 hover:text-gold hover:border-gold rounded-full transition-all duration-300"
            >
              <FaGithub className="text-xl" />
              <span className="hidden lg:inline font-medium text-sm">GitHub</span>
            </a>

            {/* 2. NEW: Profile Button */}
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-2 border border-transparent text-slate-300 hover:text-gold hover:border-gold rounded-full transition-all duration-300"
            >
              <User size={20} />
              <span className="hidden sm:inline font-medium text-sm">Profile</span>
            </Link>

            {/* 3. Wallet Connect */}
            <div className="connect-btn-wrapper">
                <ConnectButton 
                  accountStatus="address" 
                  chainStatus="icon"
                  showBalance={false}
                />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}