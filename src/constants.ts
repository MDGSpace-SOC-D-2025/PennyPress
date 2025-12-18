export const CONTRACT_ADDRESS = "0x855EFbf9350214a472BE2DB44B98F8D8A9c7800e"; 

export const PENNYPRESS_ABI = [
  // 1. The Register Function (This was missing!)
  {
    "type": "function",
    "name": "registerArticle",
    "inputs": [
      { "name": "articleId", "type": "bytes32", "internalType": "bytes32" },
      { "name": "price", "type": "uint256", "internalType": "uint256" },
      { "name": "ipfsCid", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  // 2. The Pay Function
  {
    "type": "function",
    "name": "payToAccess",
    "inputs": [
      { "name": "articleId", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  // 3. The Check Function (For reading access)
  {
    "type": "function",
    "name": "checkAccess",
    "inputs": [
      { "name": "articleId", "type": "bytes32", "internalType": "bytes32" },
      { "name": "user", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  // 4. Events
  {
    "type": "event",
    "name": "ArticleRegistered",
    "inputs": [
      { "name": "articleId", "type": "bytes32", "indexed": true, "internalType": "bytes32" },
      { "name": "creator", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "price", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "AccessGranted",
    "inputs": [
      { "name": "articleId", "type": "bytes32", "indexed": true, "internalType": "bytes32" },
      { "name": "user", "type": "address", "indexed": true, "internalType": "address" }
    ],
    "anonymous": false
  }
] as const;