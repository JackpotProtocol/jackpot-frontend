'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import ReliableWalletConnect from '../components/ReliableWalletConnect'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const { connected } = useWallet()

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* 简洁的顶部标题 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-emerald-400 mb-2">
              💰 Jackpot Protocol
            </h1>
            <p className="text-emerald-300 text-lg">
              Perpetual Wealth Aggregator on Solana
            </p>
          </div>
          <ReliableWalletConnect />
        </div>

        {/* 主要内容区域 */}
        {connected ? (
          <Dashboard />
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6 text-emerald-400">💎</div>
              <h2 className="text-3xl font-light mb-4 text-white">Connect Wallet</h2>
              <p className="text-emerald-200 mb-8 text-lg">
                Start your journey to perpetual wealth
              </p>
              <div className="flex justify-center">
                <ReliableWalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
