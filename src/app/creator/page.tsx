import UploadForm from "@/components/UploadForm";

export default function CreatorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      
      {/* Optional Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-accent opacity-[0.02] blur-[120px] pointer-events-none rounded-full"></div>

      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Publish New Article
        </h1>
        <p className="text-text-muted text-lg font-light">
          Share your knowledge securely on the blockchain.
        </p>
      </div>

      <div className="w-full flex justify-center relative z-10">
        <UploadForm />
      </div>

    </main>
  );
}