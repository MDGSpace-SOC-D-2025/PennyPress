import { Client, cacheExchange, fetchExchange } from 'urql';

// ⚠️ Make sure there are NO SPACES inside the quotes!
const GOLDSKY_API_URL = "https://api.goldsky.com/api/public/project_cmj877hvmkci001sf83v915vv/subgraphs/penny-press/1.0.0/gn"; 

export const client = new Client({
  url: GOLDSKY_API_URL,
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: 'network-only', // Forces a fresh fetch every time
});