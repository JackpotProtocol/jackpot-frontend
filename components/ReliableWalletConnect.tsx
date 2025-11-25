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
        className="bg-emerald-800 text-white px-6 py-3 rounded-lg font-semibold opacity-50"
      >
        加载钱包...
      </button>
    )
  }
)

export default function ReliableWalletConnect() {
  const { connected, publicKey } = useWallet()

  return (
    <div className="flex flex-col items-center space-y-2">
      {connected && publicKey && (
        <div className="text-sm text-emerald-300 bg-emerald-900 bg-opacity-50 px-3 py-1 rounded-lg">
          已连接: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButton 
        style={{
          backgroundColor: '#10B981',
          backgroundImage: 'linear-gradient(to right, #10B981, #059669)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
        }}
        onMouseEnter={(e: any) => {
          e.target.style.transform = 'translateY(-1px)'
          e.target.style.boxShadow = '0 6px 20px 0 rgba(16, 185, 129, 0.4)'
        }}
        onMouseLeave={(e: any) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
        }}
      />
    </div>
  )
}
