import UploadForm from "@/components/UploadForm";

export default function CreatorPage() {
  return (
    <main className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4">

      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white mb-2" style={{ letterSpacing: '-1px' }}>
          Publish New Article
        </h1>
        {/* THEME UPDATE: Use new text-muted-blue class */}
        <p className="text-muted-blue">
          Share your knowledge securely on the blockchain.
        </p>
      </div>

      <UploadForm />

    </main>
  );
}