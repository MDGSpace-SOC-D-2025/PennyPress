import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"

export default function Header() {
  return (
    <header className="w-full bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              PennyPress
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/cyfrin/TSender"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              <FaGithub className="text-xl" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}