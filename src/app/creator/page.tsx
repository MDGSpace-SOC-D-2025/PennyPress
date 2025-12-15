import UploadForm from "@/components/UploadForm";

export default function CreatorPage() {
  return (
    <main className="min-h-screen bg-gray-950 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-8">Publish New Article</h1>
      <UploadForm />
    </main>
  );
}