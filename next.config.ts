import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  webpack: (config, { isServer }) => {
    const webpack = require('webpack');
    const { IgnorePlugin } = webpack;
    
    config.plugins = config.plugins || [];
    
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /^(tap|tape|why-is-node-running)$/,
      })
    );

    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /^@coinbase\/wallet-sdk$|^@gemini-wallet\/core$|^porto$|^@react-native-async-storage\/async-storage$|^@walletconnect\/modal$|^pino-pretty$/,
      })
    );

    config.plugins.push(
      new IgnorePlugin({
        checkResource(resource: string, context: string) {
          if (context.includes('node_modules') && /\.(test|spec)\.(js|mjs|ts|tsx)$/.test(resource)) {
            return true;
          }
          return false;
        },
      })
    );

    /////adding fallback for test dependencies and optional wallet connectors
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      tap: false,
      tape: false,
      "why-is-node-running": false,
      "@coinbase/wallet-sdk": false,
      "@gemini-wallet/core": false,
      "porto": false,
      "@react-native-async-storage/async-storage": false,
      "@walletconnect/modal": false,
      "pino-pretty": false,
    };

    return config;
  },
};

export default nextConfig;