"use client";
import Link from "next/link";
import { TrendingUp, ShieldCheck, LayoutDashboard, Coins } from "lucide-react"; // Make sure to install lucide-react if not present

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[var(--navy-bg)] text-[var(--text-off-white)]">

      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--yellow-accent)] opacity-[0.03] blur-[100px] pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
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
            Creators keep 90% of earnings. Stakers earn 5%.
          </span>
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-[800px] justify-center mt-4">
          <Link href="/creator" className="group flex-1 text-decoration-none">
            <div className="card h-full p-8 transition-all hover:-translate-y-2 hover:border-[var(--yellow-accent)] border border-[var(--navy-border)] bg-[var(--navy-card)] rounded-2xl relative">
              <div className="absolute top-4 right-4 text-[var(--yellow-accent)] opacity-20 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--yellow-accent)]">For Writers</h2>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                Monetize research without the platform tax. Gain reach via the staking pool.
              </p>
              <span className="inline-block px-4 py-2 rounded-full border border-[var(--yellow-accent)] text-[var(--yellow-accent)] text-xs font-bold uppercase tracking-wider group-hover:bg-[var(--yellow-accent)] group-hover:text-[var(--navy-bg)] transition-colors">
                Start Publishing
              </span>
            </div>
          </Link>
          <Link href="/reader" className="group flex-1 text-decoration-none">
            <div className="card h-full p-8 transition-all hover:-translate-y-2 hover:border-[var(--yellow-accent)] border border-[var(--navy-border)] bg-[var(--navy-card)] rounded-2xl relative">
              <div className="absolute top-4 right-4 text-[var(--yellow-accent)] opacity-20 group-hover:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--yellow-accent)]">For Readers</h2>
              <p className="text-[var(--text-muted)] text-sm mb-4">
                Access niche content. Stake on quality articles to earn passive rewards.
              </p>
              <span className="inline-block px-4 py-2 rounded-full border border-[var(--navy-border)] text-[var(--text-off-white)] text-xs font-bold uppercase tracking-wider group-hover:border-[var(--text-off-white)] transition-colors">
                Explore Library
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="w-full bg-[var(--navy-card)] border-y border-[var(--navy-border)] py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-[var(--yellow-accent)] mb-2">90%</span>
            <span className="text-white font-semibold">Creator Revenue</span>
            <span className="text-[var(--text-muted)] text-sm px-8 mt-2">
              Smart contracts send funds instantly to your wallet.
            </span>
          </div>

          <div className="flex flex-col items-center border-l-0 md:border-l border-[var(--navy-border)]">
            <span className="text-4xl font-bold text-[var(--yellow-accent)]">5%</span>
            <span className="text-white font-semibold">Staker Yield</span>
            <span className="text-[var(--text-muted)] text-sm px-8 mt-2">
              Earn passive ETH by staking on high-quality articles.
            </span>
          </div>

          <div className="flex flex-col items-center border-l-0 md:border-l border-[var(--navy-border)]">
            <span className="text-4xl font-bold text-[var(--yellow-accent)]">100%</span>
            <span className="text-white font-semibold">Ownership</span>
            <span className="text-[var(--text-muted)] text-sm px-8 mt-2">
              Content is encrypted on IPFS. You own your data.
            </span>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: STAKING MECHANISM --- */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">The Staking Ecosystem</h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
             A symbiotic relationship where creators gain reach and readers earn yield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           {/* Card 1: Reader Incentive */}
           <div className="p-8 rounded-3xl bg-[#0d1f3a] border border-[var(--navy-border)] hover:border-[var(--yellow-accent)] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={120} className="text-[var(--yellow-accent)]" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[var(--navy-bg)] border border-[var(--yellow-accent)] flex items-center justify-center mb-6 text-[var(--yellow-accent)]">
                  <Coins size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Invest in Knowledge</h3>
                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                  Spot a viral article early? <strong className="text-[var(--yellow-accent)]">Stake ETH</strong> on it. 
                  Every time a future reader purchases that article, 5% of the fee is distributed proportionally 
                  to the staking pool.
                </p>
                <ul className="space-y-3 text-sm text-[var(--text-off-white)]">
                  <li className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[var(--yellow-accent)]" />
                    <span>Real-time yield generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[var(--yellow-accent)]" />
                    <span>Unstake your principal anytime</span>
                  </li>
                </ul>
              </div>
           </div>

           {/* Card 2: Creator Incentive */}
           <div className="p-8 rounded-3xl bg-[#0d1f3a] border border-[var(--navy-border)] hover:border-[var(--yellow-accent)] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <LayoutDashboard size={120} className="text-[var(--yellow-accent)]" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[var(--navy-bg)] border border-[var(--yellow-accent)] flex items-center justify-center mb-6 text-[var(--yellow-accent)]">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Boost Your Reach</h3>
                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                  Creators share 5% of their revenue with stakers for a reason. 
                  The <strong className="text-[var(--yellow-accent)]">"Most Staked"</strong> sorting algorithm 
                  pushes heavily backed content to the top of the homepage, guaranteeing visibility.
                </p>
                <ul className="space-y-3 text-sm text-[var(--text-off-white)]">
                  <li className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[var(--yellow-accent)]" />
                    <span>Community-driven curation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[var(--yellow-accent)]" />
                    <span>Incentivize your true fans</span>
                  </li>
                </ul>
              </div>
           </div>
        </div>
      </section>

      {/* --- NEW SECTION: DASHBOARD PREVIEW --- */}
      <section className="py-16 bg-[var(--navy-card)] border-y border-[var(--navy-border)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold text-white mb-8">Your Decentralized Command Center</h2>
           <p className="text-[var(--text-muted)] mb-10 max-w-2xl mx-auto">
             Visit your Profile to manage your entire portfolio. We track everything on the blockchain so you don't have to.
           </p>
           
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-xl border border-[var(--navy-border)] bg-[var(--navy-bg)]">
                <h4 className="font-bold text-[var(--yellow-accent)] mb-2">Track Earnings</h4>
                <p className="text-sm text-[var(--text-muted)]">
                  View total revenue from your articles and claims from your stakes in real-time.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-[var(--navy-border)] bg-[var(--navy-bg)]">
                <h4 className="font-bold text-[var(--yellow-accent)] mb-2">Manage Library</h4>
                <p className="text-sm text-[var(--text-muted)]">
                  Access all your purchased content permanently stored on IPFS.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-[var(--navy-border)] bg-[var(--navy-bg)]">
                <h4 className="font-bold text-[var(--yellow-accent)] mb-2">Claim Rewards</h4>
                <p className="text-sm text-[var(--text-muted)]">
                  One-click buttons to withdraw your staking yield directly to your wallet.
                </p>
              </div>
           </div>

           <div className="mt-12">
             <Link href="/profile">
               <button className="px-8 py-3 rounded-full bg-[var(--yellow-accent)] text-[var(--navy-bg)] font-bold hover:bg-[#e6c200] transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                 Go to Dashboard
               </button>
             </Link>
           </div>
        </div>
      </section>

      {/* --- TECH STACK (Existing) --- */}
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

      {/* --- FOOTER --- */}
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