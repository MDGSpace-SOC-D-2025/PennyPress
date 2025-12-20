import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"
import Link from "next/link";

export default function Header() {
  return (
    // THEME UPDATE: Use new navy card color and border
    <header className="w-full border-b" style={{ backgroundColor: 'var(--navy-card)', borderColor: 'var(--navy-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="no-underline">
              <h1 className="text-2xl font-bold text-white hover:text-accent transition-colors">
                PennyPress
              </h1>
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