'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import MinimalWalletConnect from '../components/MinimalWalletConnect'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const { connected } = useWallet()

  return (
    <main className="min-h-screen text-white" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-8">
        {/* 顶部标题和钱包连接 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              🎰 Jackpot Protocol
            </h1>
            <p className="text-gray-400 mt-2">
              The Perpetual Wealth Aggregator on Solana
            </p>
          </div>
          <MinimalWalletConnect />
        </div>

        {/* 主要内容区域 */}
        {connected ? (
          <Dashboard />
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-gray-400 mb-8">
                Connect your Solana wallet to start participating in the Jackpot Protocol
              </p>
              <div className="flex justify-center">
                <MinimalWalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
