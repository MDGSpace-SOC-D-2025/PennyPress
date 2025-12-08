"use client"

import { getDefaultConfig, getDefaultWallets} from "@rainbow-me/rainbowkit";
import { get } from "http";
import { anvil, mainnet, zkSync, zkSyncSepoliaTestnet } from "viem/chains";

export default getDefaultConfig({
  appName: "PennyPress",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  // Add zksyncSepoliaTestnet to the chains array
  chains: [anvil, zkSyncSepoliaTestnet, zkSync, mainnet], 
  ssr: false,
});
