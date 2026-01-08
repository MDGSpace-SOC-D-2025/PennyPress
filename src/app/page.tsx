"use client";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">

      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--yellow-accent)] opacity-[0.03] blur-[100px] pointer-events-none"></div>
      <section className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 relative z-10">

        <h1 
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }} 
          className="font-extrabold mb-4 bg-gradient-to-r from-[var(--yellow-accent)] via-[#FFE57F] to-[var(--yellow-accent)] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient"
        >
          PennyPress
        </h1>
        <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl mb-8 font-light">
          The decentralized marketplace for independent minds. <br className="hidden md:block"/>
          <span className="text-[var(--text-off-white)] font-medium">
            Creators keep 95% of earnings. Readers pay only for what they read.
          </span>
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-[800px] justify-center mt-4">

          <Link href="/creator" className="group flex-1 text-decoration-none">
            <div className="card h-full p-8 transition-all hover:-translate-y-2 hover:border-[var(--yellow-accent)] relative">
              <div className="absolute top-4 right-4 text-[var(--yellow-accent)] opacity-20 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--yellow-accent)]">For Writers</h2>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                Monetize research and articles without the 50% platform tax. 
              </p>
              <span className="inline-block px-4 py-2 rounded-full border border-[var(--yellow-accent)] text-[var(--yellow-accent)] text-xs font-bold uppercase tracking-wider group-hover:bg-[var(--yellow-accent)] group-hover:text-[var(--navy-bg)] transition-colors">
                Start Publishing
              </span>
            </div>
          </Link>
          <Link href="/reader" className="group flex-1 text-decoration-none">
            <div className="card h-full p-8 transition-all hover:-translate-y-2 hover:border-[var(--yellow-accent)] relative">
              <div className="absolute top-4 right-4 text-[var(--yellow-accent)] opacity-20 group-hover:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--yellow-accent)]">For Readers</h2>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                Access niche content via micro-transactions. No monthly commitments.
              </p>
              <span className="inline-block px-4 py-2 rounded-full border border-[var(--navy-border)] text-[var(--text-off-white)] text-xs font-bold uppercase tracking-wider group-hover:border-[var(--text-off-white)] transition-colors">
                Explore Library
              </span>
            </div>
          </Link>

        </div>
      </section>

      <section className="w-full bg-[var(--navy-card)] border-y border-[var(--navy-border)] py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-[var(--yellow-accent)] mb-2">95%</span>
            <span className="text-white font-semibold">Revenue Share</span>
            <span className="text-[var(--text-muted)] text-sm px-8 mt-2">
              Smart contracts split payments instantly. You keep the lion's share.
            </span>
          </div>

          <div className="flex flex-col items-center border-l-0 md:border-l border-[var(--navy-border)]">
            <span className="text-4xl font-bold text-[var(--yellow-accent)]">zkSync</span>
            <span className="text-white font-semibold mt-2">Layer 2 Security</span>
            <span className="text-[var(--text-muted)] text-sm px-8 mt-2">
              Lightning fast transactions with near-zero gas fees.
            </span>
          </div>


          <div className="flex flex-col items-center border-l-0 md:border-l border-[var(--navy-border)]">
            <span className="text-4xl font-bold text-[var(--yellow-accent)]">100%</span>
            <span className="text-white font-semibold">Ownership</span>
            <span className="text-[var(--text-muted)] text-sm px-8 mt-2">
              Content is encrypted on IPFS. You own your data, not us.
            </span>
          </div>

        </div>
      </section>

      <section className="py-16 px-4 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-8">Powered by the Decentralized Web</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[var(--text-muted)]">
            <div className="p-4 rounded-xl bg-[var(--navy-bg)] border border-[var(--navy-border)]">
                <strong className="block text-[var(--yellow-accent)] mb-2">1. Upload</strong>
                PDFs are encrypted client-side using Lit Protocol.
            </div>
            <div className="p-4 rounded-xl bg-[var(--navy-bg)] border border-[var(--navy-border)]">
                <strong className="block text-[var(--yellow-accent)] mb-2">2. Store</strong>
                Encrypted assets are pinned securely to IPFS.
            </div>
            <div className="p-4 rounded-xl bg-[var(--navy-bg)] border border-[var(--navy-border)]">
                <strong className="block text-[var(--yellow-accent)] mb-2">3. Purchase</strong>
                Users pay small ETH fees to unlock access keys.
            </div>
            <div className="p-4 rounded-xl bg-[var(--navy-bg)] border border-[var(--navy-border)]">
                <strong className="block text-[var(--yellow-accent)] mb-2">4. Earn</strong>
                Funds go directly to your wallet via Smart Contract.
            </div>
        </div>
      </section>


      <footer className="mt-auto py-8 text-center border-t border-[var(--navy-border)] bg-[var(--navy-card)]">
         <h3 className="text-lg bg-gradient-to-r from-[var(--yellow-accent)] via-[#FFE57F] to-[var(--yellow-accent)] bg-[length:200%_auto] bg-clip-text text-transparent font-mono">
            1 ETH = 10,000 PennyPress Tokens
         </h3>
         <p className="text-[var(--text-muted)] text-xs mt-2 opacity-50">
            Current Network: zkSync Sepolia
         </p>
      </footer>
      
    </main>
  );
}