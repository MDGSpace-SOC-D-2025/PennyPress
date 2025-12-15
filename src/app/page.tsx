import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
        PennyPress
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Creator Path */}
        <Link href="/creator" className="group">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition-all cursor-pointer h-full text-center">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400">For Creators</h2>
            <p className="text-gray-400">Upload your work, set a price, and publish to the blockchain.</p>
          </div>
        </Link>

        {/* Reader Path */}
        <Link href="/reader" className="group">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer h-full text-center">
            <div className="text-6xl mb-4">📖</div>
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400">For Readers</h2>
            <p className="text-gray-400">Discover articles, pay per post, and support creators directly.</p>
          </div>
        </Link>
      </div>
    </main>
  );
}