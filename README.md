# PennyPress 
Penny Press is a decentralized platform that uses micro-transactions to access content. To build a platform which charges just 5% of a creator's revenue, which too would be utilized for protocol fees and community building. Penny Press would be built on layer 2 using zkSync. The platform would host a shared community of creators and users built on trust and security. It would have user verified article recommendations instead of an advertisements curated feed. A platform where small creators can find their audience and build a platform that thrives on ideas.

## Getting Started

First, run the development server:git

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
## Project Structure

### Major Directories
* **`src/`**: The core of the frontend application containing Next.js pages, React components, and logic.
* **`penyy-press/`**: Configuration for **The Graph**. Defines the schema (`schema.graphql`) and mapping logic (`subgraph.yaml`) to index smart contract events for fast querying.
* **`zkout/`**: (Auto-generated) Stores compiled build artifacts for smart contracts specifically for the **zkSync** network.
* **`public/`**: Static assets like images, icons, and fonts served directly to the browser.

## Core Application Architecture (`src/app/`)
### 1. layout.tsx
* The global wrapper for the entire application.
* Defines the root HTML structure (`<html>`, `<body>`).
* Wraps the entire app in `<Providers>`, ensuring wallet connection states (Wagmi/RainbowKit) are accessible everywhere.
* Renders the `<Header />` component so navigation persists across page changes.

### 2. providers.tsx (Web3)
* A Client Component that adds the blockchain context.
* Configures **Wagmi** and **RainbowKit**.
* Defines supported chains: zkSync Testnet/Mainnet.

### 3. page.tsx 
* Separates user flows by offering two distinct paths: **"For Creators"** (to upload content) and **"For Readers"** (to browse the marketplace).
* Removes direct data fetching from the home route, serving instead as a lightweight gateway to the `/creator` and `/reader` sub-applications.
  
## Component Workflow (`src/components/`)

### 1. ArticleGrid.tsx
* **Type:** Client Component (`"use client"`)
* Manages the list of articles and loading states.
* Uses `useEffect` to trigger data fetching.
* Toggles between a loading spinner and the content grid.
* Maps through fetched data to render `<ArticleCard />` components.

### 2. ArticleCard.tsx
* **Type:** Presentational Component (Client)
* Displays a single article in a card format.
* Formats blockchain data (converting Wei to ETH).
* Displays title, truncated creator address, and price.

### 3. ArticleReader.ts
* **Type:** complex data fetching
* Calls **The Graph** (Goldsky) to get blockchain metadata (IDs, Prices, Owners).
* Uses `Promise.all` to fetch IPFS content (Title, Description) in parallel using the CIDs from step 1.
* Combines blockchain data with IPFS metadata for the UI.

### UploadForm.tsx
* **Client-Side Encryption:** Uses **Lit Protocol** to encrypt files before they leave the user's browser. Only users who pay the on-chain price can decrypt them.
* **Decentralized Storage:** Bundles encrypted metadata and uploads directly to **IPFS**.
* **On-Chain Registration:** Interacts with the **zkSync** smart contract using **Wagmi** hooks to register the article, creating an immutable link between the IPFS hash and the creator's wallet.
* Provides real-time status updates for encryption, upload progress, and blockchain transaction confirmation.
* 
### ReadButton.tsx
* Automatically queries the smart contract (`checkAccess`) on load to see if the user has already purchased the article.
* Recognizes the article's author and grants immediate, free access without requiring a transaction.
* Handles the purchase flow payToAccess, converting ETH prices and tracking transaction confirmation in real-time.
* Uses **Lit Protocol** to securely decrypt IPFS content only *after* the blockchain confirms the user has valid access rights.

## Some Important links
1. [Smart Contract zkSync Sepolia Explorer](https://sepolia.explorer.zksync.io/address/0x855EFbf9350214a472BE2DB44B98F8D8A9c7800e#contract) 
2. [Goldsky Subgraoh Address](https://api.goldsky.com/api/public/project_cmj877hvmkci001sf83v915vv/subgraphs/penny-press/1.0.0/gn)
