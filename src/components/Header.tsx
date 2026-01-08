"use client"; // Ensure this is a client component for RainbowKit

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-navy-bg border-navy-border sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/Logo.png" 
                alt="PennyPress Logo"
                className="h-30 w-auto object-contain"
              />
              <span className="font-bold text-xl text-white tracking-tight hidden md:block group-hover:text-yellow-accent transition-colors">
                PennyPress
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/MDGSpace-SOC-D-2025/PennyPress"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-transparent text-text-muted hover:text-yellow-accent hover:border-yellow-accent rounded-full transition-all duration-300"
            >
              <FaGithub className="text-xl" />
              <span className="hidden sm:inline font-medium">GitHub</span>
            </a>
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