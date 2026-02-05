# PennyPress 📰

> A decentralized content marketplace where creators keep 90% of revenue and readers earn by investing in quality content.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![zkSync Era](https://img.shields.io/badge/zkSync-Era-blue)](https://era.zksync.io/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.30-363636?logo=solidity)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)

**Live Demo:** [pennypress.vercel.app](#) | **Contract:** [`0x91D603Cdd2957935B8aA6BE149ac2c01e9eFcbF3`](https://sepolia.explorer.zksync.io/address/0x91D603Cdd2957935B8aA6BE149ac2c01e9eFcbF3)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Smart Contract](#-smart-contract)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

---

## 🌟 Overview

PennyPress is a **decentralized content marketplace** that reimagines how creators monetize their work. Built on zkSync Era with client-side encryption (Lit Protocol) and permanent storage (IPFS), it enables:

- **90% Creator Revenue** (vs. 50-90% on traditional platforms)
- **Micro-Transactions** ($0.50 - $5 per article with ~$0.10 gas)
- **Staking Rewards** (readers earn 5% by investing in content early)
- **Permanent Ownership** (articles live on IPFS forever)
- **Zero-Knowledge Access** (platform can't read encrypted content)

> **Built as part of MDG Space's Season of Code program** - my first production-ready Web3 application.

---

## ❌ The Problem

Independent creators face an impossible choice:

| Platform | Fee | Discovery | Ownership |
|----------|-----|-----------|-----------|
| **Medium** | 10% + algorithmic burial | Platform controls feed | No content ownership |
| **Substack** | 10% | Requires 1000+ subscribers | Platform dependency |
| **Patreon** | 5-12% | External traffic only | No built-in discovery |

**The real issue:** Platforms extract value from creators while controlling monetization, discovery, AND ownership.

---

## ✅ The Solution

### For Writers
1. Upload PDF article (encrypted client-side)
2. Set price (e.g., $0.50)
3. Earn **90% instantly** when someone purchases

### For Readers
1. Pay-per-article (no forced subscriptions)
2. **Stake ETH** on articles you believe will succeed
3. Earn **5% of future purchases** proportional to your stake

### The Innovation
**Staking volume determines visibility.** Instead of algorithms optimizing for engagement, the community financially backs quality content. If you're early on a viral article, you earn as it spreads.

---

## 🚀 Key Features

### Creator Benefits
- ✅ **90% Revenue Share** - Platform takes only 5%
- ✅ **Instant Payouts** - ETH goes directly to your wallet
- ✅ **No Minimum Followers** - Monetize from day one
- ✅ **Content Ownership** - Articles are yours forever on IPFS
- ✅ **Censorship Resistant** - No platform can delete your work

### Reader Benefits
- ✅ **Pay-Per-Article** - $0.50 - $5, no subscriptions
- ✅ **Earn Staking Rewards** - 5% of purchases if you invest early
- ✅ **Community Curation** - Stake = signal of quality
- ✅ **Permanent Access** - Once purchased, always accessible
- ✅ **Privacy First** - Decryption happens client-side

### Technical Benefits
- ✅ **Client-Side Encryption** - Lit Protocol threshold cryptography
- ✅ **Low Gas Fees** - zkSync L2 (~$0.10 per transaction)
- ✅ **Fast Queries** - The Graph indexes blockchain events
- ✅ **Type-Safe** - End-to-end TypeScript from contracts to UI
- ✅ **Production Ready** - ReentrancyGuard, access control, error handling

---

## 🛠️ Tech Stack

### Blockchain Layer
- **[zkSync Era](https://era.zksync.io/)** - Layer 2 scaling solution (low gas fees)
- **[Solidity 0.8.30](https://soliditylang.org/)** - Smart contract language
- **[OpenZeppelin](https://openzeppelin.com/)** - Battle-tested contract libraries
- **[Foundry](https://getfoundry.sh/)** - Smart contract development framework

### Decentralized Infrastructure
- **[Lit Protocol](https://litprotocol.com/)** - Threshold cryptography for encryption
- **[IPFS](https://ipfs.tech/)** - Permanent, decentralized storage
- **[Pinata](https://pinata.cloud/)** - IPFS pinning service
- **[The Graph](https://thegraph.com/)** - Blockchain indexing (via Goldsky)

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Wagmi](https://wagmi.sh/)** - React hooks for Ethereum
- **[RainbowKit](https://rainbowkit.com/)** - Wallet connection UI
- **[Viem](https://viem.sh/)** - TypeScript Ethereum library

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  Next.js 14 + TypeScript + Tailwind + Wagmi/RainbowKit     │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌───────────────┐   ┌──────────────────┐
│  BLOCKCHAIN   │   │  DECENTRALIZED   │
│               │   │    STORAGE       │
│ zkSync Era    │   │                  │
│  (Sepolia)    │   │  IPFS + Pinata   │
│               │   │  (Encrypted      │
│ Smart         │   │   Content)       │
│ Contract      │   │                  │
└───────┬───────┘   └────────┬─────────┘
        │                    │
        │                    │
        ▼                    ▼
┌─────────────────┐  ┌──────────────────┐
│   THE GRAPH     │  │  LIT PROTOCOL    │
│                 │  │                  │
│ Event Indexing  │  │  Encryption      │
│ GraphQL API     │  │  Access Control  │
└─────────────────┘  └──────────────────┘
```

### Data Flow

#### 1. **Article Upload**
```
Creator → Encrypt (Lit) → Upload (IPFS) → Register (Smart Contract) → Index (The Graph)
```

#### 2. **Article Purchase**
```
Reader → Pay (Smart Contract) → Access Granted → Decrypt (Lit) → View Content
```

#### 3. **Staking**
```
User → Stake ETH → Update Pool → Future Purchases → Distribute Rewards
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Git** for cloning the repository
- **Wallet** (MetaMask, Coinbase Wallet, etc.)
- **zkSync Sepolia ETH** ([Get from faucet](https://faucet.zksync.io/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/TathagatGupta98/pennypress.git
cd pennypress
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Pinata (IPFS)
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_here

# WalletConnect (RainbowKit)
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id

# Contract Address (already deployed on zkSync Sepolia)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x91D603Cdd2957935B8aA6BE149ac2c01e9eFcbF3
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Smart Contract

### Deployed Contract

**Network:** zkSync Sepolia Testnet  
**Address:** [`0x91D603Cdd2957935B8aA6BE149ac2c01e9eFcbF3`](https://sepolia.explorer.zksync.io/address/0x91D603Cdd2957935B8aA6BE149ac2c01e9eFcbF3)

### Core Functions

```solidity
// Register a new article
function registerArticle(
    bytes32 articleId, 
    uint256 price, 
    string calldata ipfsCid
) external

// Purchase access to an article
function payToAccess(bytes32 articleId) external payable

// Stake ETH on an article
function stake(bytes32 articleId) external payable

// Unstake and claim rewards
function unstake(bytes32 articleId) external

// Claim staking rewards without unstaking
function claimRewards(bytes32 articleId) external

// Check if user has access
function checkAccess(bytes32 articleId, address user) 
    external view returns (bool)
```

### Revenue Distribution

```
Purchase Price (100%)
├── Creator: 90%
├── Stakers: 5% (proportional to stake)
└── Protocol: 5%
```

### Staking Mechanism

Uses a **reward-per-share** algorithm (similar to MasterChef):

```solidity
// When someone purchases
accRewardsPerShare += (stakerShare * PRECISION_FACTOR) / totalStaked

// When staker claims
pending = (userStake * accRewardsPerShare) / PRECISION_FACTOR - rewardDebt
```

**Benefits:**
- O(1) reward calculation (no loops)
- Gas-efficient even with 1000+ stakers
- Automatic compounding

---

## 📁 Project Structure

```
pennypress/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout (Providers)
│   │   ├── providers.tsx         # Web3 providers (Wagmi/RainbowKit)
│   │   ├── creator/              # Article upload flow
│   │   ├── reader/               # Marketplace
│   │   ├── profile/              # User dashboard
│   │   └── api/upload/           # IPFS upload endpoint
│   │
│   ├── components/               # React components
│   │   ├── ArticleGrid.tsx       # Marketplace grid
│   │   ├── ArticleCard.tsx       # Individual article card
│   │   ├── ReadButton.tsx        # Purchase & decrypt logic
│   │   ├── StakeButton.tsx       # Staking interface
│   │   ├── UploadForm.tsx        # Creator upload form
│   │   └── Header.tsx            # Navigation bar
│   │
│   ├── contracts/                # Solidity smart contracts
│   │   └── PennyPress.sol        # Main contract
│   │
│   ├── utils/                    # Utilities
│   │   ├── lit.ts                # Lit Protocol encryption
│   │   ├── ArticleReader.tsx     # GraphQL queries
│   │   └── ProfileReader.ts      # User data fetching
│   │
│   ├── constants.ts              # Contract ABI & address
│   └── rainbowKitConfig.tsx      # Wallet configuration
│
├── penny-press/                  # The Graph subgraph
│   ├── schema.graphql            # GraphQL schema
│   ├── subgraph.yaml             # Subgraph config
│   └── src/penny-press.ts        # Event handlers
│
├── public/                       # Static assets
├── zkout/                        # zkSync compiled contracts
└── package.json
```

---

## 🔄 How It Works

### 1. Article Upload (Creator Flow)

```typescript
// Step 1: Encrypt with Lit Protocol
const encryptedData = await lit.encryptFile(file, articleId, creatorAddress);

// Step 2: Bundle metadata
const metadata = {
  title: "Article Title",
  description: "Summary",
  ciphertext: encryptedData.ciphertext,
  dataToEncryptHash: encryptedData.dataToEncryptHash,
  accessControlConditions: encryptedData.accessControlConditions,
  fileType: "application/pdf"
};

// Step 3: Upload to IPFS
const { IpfsHash } = await uploadToPinata(metadata);

// Step 4: Register on blockchain
await contract.registerArticle(
  keccak256(IpfsHash), 
  parseEther("0.05"), 
  IpfsHash
);
```

**Result:** Article is encrypted, stored permanently, and registered on-chain. Creator gets automatic access.

---

### 2. Article Purchase (Reader Flow)

```typescript
// Step 1: Check if user has access
const hasAccess = await contract.checkAccess(articleId, userAddress);

if (!hasAccess) {
  // Step 2: Purchase access
  await contract.payToAccess(articleId, { value: price });
  
  // Revenue split happens automatically:
  // - 90% → creator (in creatorBalances)
  // - 5% → staking pool (updates accRewardsPerShare)
  // - 5% → protocol treasury
}

// Step 3: Fetch encrypted content from IPFS
const metadata = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsCid}`);

// Step 4: Decrypt with Lit Protocol
const decryptedBlob = await lit.decryptFile(
  metadata.ciphertext,
  metadata.dataToEncryptHash,
  metadata.accessControlConditions,
  metadata.fileType
);

// Step 5: Display PDF
window.open(URL.createObjectURL(decryptedBlob), '_blank');
```

**Result:** User pays → gains access → decrypts → reads content.

---

### 3. Staking (Investment Flow)

```typescript
// Step 1: Stake ETH on article
await contract.stake(articleId, { value: parseEther("0.1") });

// Step 2: Contract updates state
// - article.totalStaked += 0.1 ETH
// - userInfo[articleId][user].amount += 0.1 ETH
// - userInfo[articleId][user].rewardDebt = updated

// Step 3: When purchases occur
// - 5% of purchase goes to staking pool
// - article.accRewardsPerShare increases proportionally

// Step 4: Claim rewards anytime
const pending = await contract.getPendingRewards(articleId, userAddress);
await contract.claimRewards(articleId);
```

**Result:** Staker earns passive income from future purchases.

---

### 4. The Graph Indexing

```graphql
# Query all articles sorted by total stake
query {
  articles(
    first: 50
    orderBy: totalStaked
    orderDirection: desc
  ) {
    id
    ipfsCid
    price
    creator
    totalStaked
    reads
  }
}
```

**Why The Graph?**
- Blockchain storage is write-optimized, not read-optimized
- Querying "top 50 articles by stake" would require reading all articles on-chain (expensive)
- The Graph indexes events in real-time → instant queries

---

## 🔒 Security

### Smart Contract Security

✅ **ReentrancyGuard** - All payable functions protected  
✅ **Access Control** - Only owner can distribute creator income  
✅ **Overflow Protection** - Solidity 0.8+ built-in checks  
✅ **Tested Edge Cases** - Zero stakes, double purchases, creator self-purchase  

### Encryption Security

✅ **Client-Side Encryption** - Content never leaves browser unencrypted  
✅ **Threshold Cryptography** - Lit Protocol uses distributed key shares  
✅ **On-Chain Verification** - Access checked via smart contract before decryption  
✅ **Zero-Knowledge** - Platform cannot read encrypted content  

### Frontend Security

✅ **Type Safety** - TypeScript prevents runtime errors  
✅ **Input Validation** - All user inputs sanitized  
✅ **Error Handling** - Graceful degradation on failures  
✅ **No localStorage** - All state managed via blockchain/React state  

### Known Limitations

⚠️ **IPFS Availability** - Content accessible only if pinned (using Pinata for reliability)  
⚠️ **Piracy Risk** - Once decrypted, users could reshare content (same as any platform)  
⚠️ **Gas Price Volatility** - zkSync fees fluctuate with network congestion  
⚠️ **Lit Protocol Rate Limits** - Free tier has request limits (upgrade for production)  

---

## 🗺️ Roadmap

### Phase 1: MVP ✅ (Completed)
- [x] Smart contract deployment on zkSync Sepolia
- [x] Client-side encryption with Lit Protocol
- [x] IPFS storage integration
- [x] The Graph subgraph indexing
- [x] Basic frontend (upload, purchase, stake)
- [x] Profile dashboard

### Phase 2: Production (In Progress)
- [ ] Smart contract audit (OpenZeppelin/CertiK)
- [ ] Mainnet deployment on zkSync Era
- [ ] Multi-chain support (Arbitrum, Base, Optimism)
- [ ] Enhanced UI/UX (animations, loading states)
- [ ] Mobile app (React Native)

### Phase 3: Features
- [ ] Article versioning (v1, v2 updates)
- [ ] Comments & discussions
- [ ] Creator analytics dashboard
- [ ] Subscription bundles (buy 10 article credits)
- [ ] USDC/USDT pricing (avoid ETH volatility)

### Phase 4: Decentralization
- [ ] Platform governance (DAO)
- [ ] PENNY token for staking/governance
- [ ] Community-curated content moderation
- [ ] Open-source protocol (anyone can run instance)

---

## 🤝 Contributing

Contributions are welcome! This project is part of my open-source learning journey.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Areas for Contribution

- 🐛 **Bug Fixes** - Found an issue? Submit a PR!
- ✨ **New Features** - Ideas for improvements
- 📚 **Documentation** - Better explanations, tutorials
- 🎨 **UI/UX** - Design improvements
- ⚡ **Optimization** - Gas savings, performance gains
- 🧪 **Testing** - Unit tests, integration tests

### Development Guidelines

- Write clean, commented code
- Follow existing code style
- Test thoroughly before submitting
- Update documentation for new features

---

## 🙏 Acknowledgments

This project was built as part of **[MDG Space's Season of Code](https://mdg.iitr.ac.in/)** mentorship program.

### Special Thanks To

- **MDG Space** - For mentorship and guidance throughout the 8-week program
- **zkSync Team** - For comprehensive documentation and developer tooling
- **Lit Protocol** - For excellent encryption SDK and community support
- **The Graph** - For making blockchain data queryable
- **OpenZeppelin** - For battle-tested smart contract libraries
- **Pinata** - For reliable IPFS pinning infrastructure

### Inspiration

- **Mirror.xyz** - Pioneer in crypto-native publishing
- **Substack** - Creator-first monetization model
- **Uniswap** - Reward distribution mechanism inspiration
- **Web3 Community** - For building open, decentralized systems

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Tathagat Gupta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 📞 Contact & Links

- **Developer:** [Tathagat Gupta]
- **Email:** janaktathagat@gmail.com
- **LinkedIn:** [https://www.linkedin.com/in/tathagat-gupta-033300273/](https://www.linkedin.com/in/tathagat-gupta-033300273/)
- **Portfolio:** [yourportfolio.com](https://yourportfolio.com)

### Project Links

- 🌐 **Live Demo:** [pennypress.vercel.app](#)
- 📄 **Smart Contract:** [`0x91D603Cdd2957935B8aA6BE149ac2c01e9eFcbF3`](https://sepolia.explorer.zksync.io/address/0x91D603Cdd2957935B8aA6BE149ac2c01e9eFcbF3)
- 📊 **Subgraph:** [Goldsky API](https://api.goldsky.com/api/public/project_cmj877hvmkci001sf83v915vv/subgraphs/pennypress/2.0.2/gn)
- 📖 **Documentation:** [docs.pennypress.io](#)

---

## 🌟 Star History

If you found this project helpful, please consider giving it a ⭐!

[![Star History](https://api.star-history.com/svg?repos=TathagatGupta98/pennypress&type=Date)](https://star-history.com/#TathagatGupta98/pennypress&Date)

---

## 💡 Learn More

### Web3 Development Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [zkSync Era Docs](https://docs.zksync.io/)
- [Wagmi Documentation](https://wagmi.sh/)
- [The Graph Academy](https://thegraph.academy/)
- [Lit Protocol Docs](https://developer.litprotocol.com/)

### Related Projects

- [Mirror.xyz](https://mirror.xyz/) - Crypto-native publishing
- [Paragraph](https://paragraph.xyz/) - Web3 newsletters
- [Unlock Protocol](https://unlock-protocol.com/) - Membership NFTs
- [Lens Protocol](https://lens.xyz/) - Decentralized social graph

---

<div align="center">

**Built with ❤️ during MDG Space's Season of Code**

[Report Bug](https://github.com/TathagatGupta98/pennypress/issues) · [Request Feature](https://github.com/TathagatGupta98/pennypress/issues) · [Documentation](#)

</div>
