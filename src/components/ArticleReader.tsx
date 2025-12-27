const API_URL = "https://api.goldsky.com/api/public/project_cmj877hvmkci001sf83v915vv/subgraphs/penny-press/1.0.0/gn";

const GRAPHQL_QUERY = `
  query {
    articles(first: 20, orderBy: createdAt, orderDirection: desc) {
      id
      ipfsCid
      price
      creator
      createdAt
    }
  }
`;
export interface ArticleData {
  id: string;
  creator: string;
  price: string; 
  blockTimestamp: number;
  title: string;
  description: string;
  ipfsCid: string;
}

const fetchIPFSMetadata = async (cid: string) => {
  try {
    let response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);

    if (!response.ok) return { title: "Untitled Article", description: "Metadata unavailable" };

    return await response.json();
  } catch (error) {
    return { title: "Untitled Article", description: "No description available." };
  }
};

export const loadArticles = async (): Promise<ArticleData[]> => {

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GRAPHQL_QUERY }),
      cache: 'no-store'
    });

    const result = await response.json();

    const enrichedArticles = await Promise.all(
      result.data.articles.map(async (article: any) => {
        const metadata = await fetchIPFSMetadata(article.ipfsCid);
        
        return {
          id: article.id,
          creator: article.creator,
          price: article.price, 
          ipfsCid: article.ipfsCid,
          blockTimestamp: article.createdAt,
          title: metadata.title || "Untitled",
          description: metadata.description || "",
        };
      })
    );

    return enrichedArticles;

  } catch (error) {
    console.error("Network Crash:", error);
    return [];
  }
};