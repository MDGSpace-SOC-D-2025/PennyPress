import { ArticleData } from "../components/ArticleReader";

const API_URL = "https://api.goldsky.com/api/public/project_cmj877hvmkci001sf83v915vv/subgraphs/pennypress/2.0.2/gn";

const PROFILE_QUERY = `
  query GetUserProfile($userAddress: Bytes!) {
    user(id: $userAddress) {
      id
      totalRevenue
      totalStaked
      articlesCreated(orderBy: createdAt, orderDirection: desc) {
        id
        ipfsCid
        price
        totalStaked
        reads
        createdAt
      }
      purchases(orderBy: timestamp, orderDirection: desc) {
        timestamp
        article {
          id
          ipfsCid
          price
          creator
          reads
        }
      }
      stakes {
        amount
        article {
          id
          ipfsCid
          price
          totalStaked
          reads
        }
      }
    }
  }
`;

// Helper to fetch IPFS title
const fetchMetadata = async (cid: string) => {
  try {
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
    if (!res.ok) throw new Error();
    const json = await res.json();
    return json.title || "Untitled Article";
  } catch {
    return "Untitled Article";
  }
};

export interface UserProfile {
  totalRevenue: string;
  totalStaked: string;
  created: any[];
  library: any[];
  stakes: any[];
}

export const loadUserProfile = async (address: string): Promise<UserProfile | null> => {
  if (!address) return null;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        query: PROFILE_QUERY,
        variables: { userAddress: address.toLowerCase() }
      }),
    });

    const result = await response.json();
    if (!result.data || !result.data.user) return null;

    const u = result.data.user;

    // Process lists in parallel to get IPFS titles
    const [created, library, stakes] = await Promise.all([
      // 1. Created Articles
      Promise.all(u.articlesCreated.map(async (a: any) => ({
        ...a, title: await fetchMetadata(a.ipfsCid)
      }))),
      // 2. Purchased Articles
      Promise.all(u.purchases.map(async (p: any) => ({
        ...p.article, title: await fetchMetadata(p.article.ipfsCid), purchasedAt: p.timestamp
      }))),
      // 3. Active Stakes
      Promise.all(u.stakes.map(async (s: any) => ({
        ...s.article, title: await fetchMetadata(s.article.ipfsCid), myStake: s.amount
      })))
    ]);

    return {
      totalRevenue: u.totalRevenue,
      totalStaked: u.totalStaked,
      created,
      library,
      stakes
    };

  } catch (error) {
    console.error("Profile Load Error:", error);
    return null;
  }
};