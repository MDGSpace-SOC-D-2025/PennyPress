export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere"; 

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