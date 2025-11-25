'use client'

import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'

const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { 
    ssr: false,
    loading: () => (
      <button 
        disabled
        className="bg-emerald-800 text-white px-6 py-3 rounded-lg font-medium opacity-50"
      >
        Loading...
      </button>
    )
  }
)

export default function ReliableWalletConnect() {
  const { connected, publicKey } = useWallet()

  return (
    <div className="flex flex-col items-center space-y-3">
      {connected && publicKey && (
        <div className="text-sm text-emerald-300 bg-emerald-900 bg-opacity-30 px-4 py-2 rounded-full border border-emerald-700">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButton 
        style={{
          backgroundColor: '#059669',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}
