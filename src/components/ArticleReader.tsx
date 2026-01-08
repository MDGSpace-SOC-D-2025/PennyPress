const API_URL = "https://api.goldsky.com/api/public/project_cmj877hvmkci001sf83v915vv/subgraphs/pennypress/1.1.1/gn"; 

const GRAPHQL_QUERY = `
  query GetArticles($orderBy: Article_orderBy, $orderDirection: OrderDirection) {
    articles(
      first: 50
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      ipfsCid
      price
      creator
      totalStaked
      createdAt   
      reads       
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
  totalStaked: string;
  reads: number;
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

export const loadArticles = async (
  sortOption: string = "newest"
): Promise<ArticleData[]> => {

  let orderBy = "createdAt"; 
  let orderDirection = "desc";

  switch (sortOption) {
    case "oldest":
      orderBy = "createdAt";
      orderDirection = "asc";
      break;
    case "most_staked":
      orderBy = "totalStaked";
      orderDirection = "desc";
      break;
    case "popularity":
      orderBy = "reads";
      orderDirection = "desc";
      break;
    case "newest":
    default:
      orderBy = "createdAt";
      orderDirection = "desc";
      break;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        query: GRAPHQL_QUERY,
        variables: { orderBy, orderDirection }
      }),
      cache: 'no-store'
    });

    const result = await response.json();

    if (result.errors) {
        console.error("GRAPH ERROR:", result.errors);
        return [];
    }

    if (!result.data || !result.data.articles) return [];

    const enrichedArticles = await Promise.all(
      result.data.articles.map(async (article: any) => {
        const metadata = await fetchIPFSMetadata(article.ipfsCid);
        
        return {
          id: article.id,
          creator: article.creator,
          price: article.price, 
          ipfsCid: article.ipfsCid,
          blockTimestamp: parseInt(article.createdAt || "0"), 
          totalStaked: article.totalStaked,
          reads: parseInt(article.reads || "0"),
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