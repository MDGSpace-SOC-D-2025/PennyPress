export const CONTRACT_ADDRESS = "0x3caEa4bDcF0D98BcEbEEAD989406b0362924cE79"; 

export const PENNYPRESS_ABI = [
  {
    "inputs": [
      { "internalType": "bytes32", "name": "contentId", "type": "bytes32" }
    ],
    "name": "payToAccess",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "contentId", "type": "bytes32" },
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "hasAccess",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;