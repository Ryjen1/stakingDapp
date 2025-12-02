import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia, mainnet, polygon } from 'wagmi/chains'

// 1. Get projectId from https://cloud.reown.com
const projectId = '9b6649ff83c31e90df10e7f2e5d13a85'

// 2. Set the chains
export const chains = [sepolia, mainnet, polygon]

// 3. Create enhanced metadata object
const metadata = {
  name: 'DeFi Staking Platform',
  description: 'Advanced decentralized staking application with multi-chain support and yield optimization',
  url: 'https://staking-dapp.reown.com',
  icons: [
    'https://avatars.githubusercontent.com/u/179229932',
    '/vite.svg'
  ],
  registry: {
    1: {
      institution: 'Ethereum Foundation',
      name: 'Ethereum'
    },
    11155111: {
      institution: 'Ethereum Foundation',
      name: 'Sepolia Testnet'
    },
    137: {
      institution: 'Polygon Labs',
      name: 'Polygon'
    }
  }
}

// 4. Set up the WagmiAdapter with enhanced configuration
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  chains,
  projectId,
  networks: chains,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true
})

export const config = wagmiAdapter.wagmiConfig

// 5. Create modal with enhanced features and branding
export const appkit = createAppKit({
  adapters: [wagmiAdapter],
  chains,
  projectId,
  metadata,
  ssr: true,
  features: {
    analytics: true,
    email: true,
    emailShowWallets: true,
    socials: ['google', 'x', 'github', 'discord', 'farcaster'],
    emailEnabled: true
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#3B82F6',
    '--w3m-color-mix': '#3B82F6',
    '--w3m-color-mix-strength': 20,
    '--w3m-border-radius-master': '12px',
    '--w3m-font-family': 'Inter, system-ui, sans-serif',
    '--w3m-button-border-radius': '12px'
  },
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96b', // MetaMask
    'fd20dc426fb49566a0a4e62476c3ad26fdd04fbb8d4cf18f54a785cf3d3f28b2', // Coinbase Wallet
  ],
  excludeWalletIds: [
    // Exclude certain wallets if needed
  ]
})