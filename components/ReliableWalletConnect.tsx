'use client'

import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'

// 动态导入官方钱包按钮，确保只在客户端渲染
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { 
    ssr: false,
    loading: () => (
      <button 
        disabled
        className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold opacity-50"
      >
        Loading...
      </button>
    )
  }
)

export default function ReliableWalletConnect() {
  const { connected, publicKey } = useWallet()

  return (
    <div className="flex flex-col items-center space-y-2">
      {connected && publicKey && (
        <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">
          已连接: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButton 
        style={{
          backgroundColor: '#f59e0b',
          backgroundImage: 'linear-gradient(to right, #f59e0b, #dc2626)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'opacity 0.2s'
        }}
      />
    </div>
  )
}
