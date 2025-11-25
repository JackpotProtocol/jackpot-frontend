'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function SimpleWalletConnect() {
  const { connected, publicKey } = useWallet()

  return (
    <div className="flex flex-col items-center space-y-2">
      {connected && publicKey && (
        <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButton 
        className="!bg-gradient-to-r !from-yellow-500 !to-red-500 !text-white !border-0 !rounded-lg !px-6 !py-3 !font-semibold"
      >
        {connected ? 'Disconnect' : 'Connect Wallet'}
      </WalletMultiButton>
    </div>
  )
}
