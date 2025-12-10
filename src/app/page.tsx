import ArticleCard from "@/components/ArticleCard";
import UploadForm from "@/components/UploadForm";

export default function Home() {
  const articles = [
    {
      id: "article-1",
      title: "The Future of zkSync",
      preview: "Layer 2 scaling solutions are rapidly evolving. In this deep dive, we explore how Account Abstraction...",
      price: "0.001"
    },
    {
      id: "article-2",
      title: "Hidden Gems in Solidity",
      preview: "Gas optimization is an art form. Here are 5 assembly tricks that saved me 20% on deployment costs...",
      price: "0.005"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 border-b border-gray-800 pb-8">
          <h2 className="text-2xl font-bold mb-4"> Debugging</h2>
          <UploadForm />
        </div>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Latest Articles
          </h2>
          <p className="text-gray-400 mt-2">
            Support independent creators directly via micro-payments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard 
              key={article.id}
              {...article}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
