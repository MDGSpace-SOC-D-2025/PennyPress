import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b" style={{ backgroundColor: '#070d1d', borderColor: 'var(--navy-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/Logo.jpeg" 
                alt="PennyPress Logo"
                className="object-cover"
                style={{ width: '300px', height: '100px' }}
              />
              <span className="font-bold text-xl text-white tracking-tight hidden md:block">
                PennyPress
              </span>
            </Link>
          </div>
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/MDGSpace-SOC-D-2025/PennyPress"
              target="_blank"
              rel="noopener noreferrer"
              // THEME UPDATE: Use yellow accent for hover and text
              className="flex items-center gap-2 px-4 py-2 border border-transparent hover:border-accent text-muted-blue hover:text-accent rounded-lg transition-all duration-300"
              style={{ backgroundColor: 'transparent' }}
            >
              <FaGithub className="text-xl" />
              <span className="hidden sm:inline font-medium">GitHub</span>
            </a>

            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}