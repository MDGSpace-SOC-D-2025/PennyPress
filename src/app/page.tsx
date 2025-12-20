"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4">

      {/* TITLE */}
      <h1
        className="display-3 fw-bold mb-5 text-center"
        style={{
          background: "linear-gradient(to right, var(--yellow-accent), #FFE57F, var(--yellow-accent))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto",
          letterSpacing: '-2px'
        }}
      >
        PennyPress
      </h1>

      {/* CONTAINER: Uses Bootstrap Flexbox instead of Tailwind Grid */}
      <div className="d-flex flex-column flex-md-row gap-4 w-100" style={{ maxWidth: '800px' }}>

        {/* Creator Path */}
        <Link href="/creator" className="flex-fill text-decoration-none group">
          <div
            className="card h-100 p-5 text-center transition-all position-relative overflow-hidden"
            style={{ 
              minHeight: '220px',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
          >
            {/* HOVER OVERLAY: Explicit CSS makes this reliable */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100" 
              style={{
                backgroundColor: 'var(--yellow-accent)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
              // This inline style trick forces the hover effect without complex CSS classes
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

        {/* Reader Path */}
        <Link href="/reader" className="flex-fill text-decoration-none group">
          <div
            className="card h-100 p-5 text-center transition-all position-relative overflow-hidden"
            style={{ 
              minHeight: '220px',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
          >
            {/* HOVER OVERLAY */}
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

      {/* CSS Helper for the Text Hover Effect */}
      <style jsx global>{`
        .group:hover h2 {
          color: var(--yellow-accent) !important;
        }
        .group:hover .card {
          transform: translateY(-5px);
          border-color: var(--yellow-accent) !important;
        }
      `}</style>
    </main>
  );
}