// app/reader/page.tsx
import ArticleGrid from "@/components/ArticleGrid";

export default function ReaderPage() {
    return (
        <main className="min-h-screen bg-navy-bg text-text-off-white">
            <div className="container mx-auto">
                <ArticleGrid />
            </div>
        </main>
    );
}