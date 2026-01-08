"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4">

      {/* TITLE */}
      <h1 style={{ fontSize: '5rem' }} className="mb-5 bg-gradient-to-r from-[var(--yellow-accent)] via-[#FFE57F] to-[var(--yellow-accent)] bg-[length:200%_auto] bg-clip-text text-transparent">
        PennyPress
      </h1>
      <div className="d-flex flex-column flex-md-row gap-4 w-100" style={{ maxWidth: '800px' }}>

        <Link href="/creator" className="flex-fill text-decoration-none group">
          <div
            className="card h-100 p-5 text-center transition-all position-relative overflow-hidden"
            style={{ 
              minHeight: '220px',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
          >
            <div 
              className="position-absolute top-0 start-0 w-100 h-100" 
              style={{
                backgroundColor: 'var(--yellow-accent)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.05'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
            ></div>

            <div className="d-flex flex-column justify-content-center h-100 position-relative z-1">
              <h2 className="h3 fw-bold text-white mb-3 transition-colors group-hover-text">
                For Creators
              </h2>
              <p className="text-muted-blue mb-0 fs-5">
                Upload your work, set a price in ETH, and publish directly to the blockchain.
              </p>
            </div>
          </div>
        </Link>

        <Link href="/reader" className="flex-fill text-decoration-none group">
          <div
            className="card h-100 p-5 text-center transition-all position-relative overflow-hidden"
            style={{ 
              minHeight: '220px',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
          >

            <div 
              className="position-absolute top-0 start-0 w-100 h-100" 
              style={{
                backgroundColor: 'var(--yellow-accent)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.05'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
            ></div>

            <div className="d-flex flex-column justify-content-center h-100 position-relative z-1">
              <h2 className="h3 fw-bold text-white mb-3 transition-colors group-hover-text">
                For Readers
              </h2>
              <p className="text-muted-blue mb-0 fs-5">
                Discover exclusive articles, support creators, and own the content you pay for.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <style jsx global>{`
        .group:hover h2 {
          color: var(--yellow-accent) !important;
        }
        .group:hover .card {
          transform: translateY(-5px);
          border-color: var(--yellow-accent) !important;
        }
      `}</style>
      <h3 className="mt-5 bg-gradient-to-r from-[var(--yellow-accent)] via-[#FFE57F] to-[var(--yellow-accent)] bg-[length:200%_auto] bg-clip-text text-transparent tracking-[-2px]"> 1 ETH = 10,000 PennyPress Tokens </h3>
    </main>
  );
}