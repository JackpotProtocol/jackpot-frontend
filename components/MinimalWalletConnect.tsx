'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'

export default function MinimalWalletConnect() {
  const { connected, publicKey, connect, disconnect, wallets } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleConnect = async () => {
    if (isConnecting) return
    
    setIsConnecting(true)
    try {
      // 直接使用Phantom钱包适配器
      const phantomWallet = wallets.find(wallet => wallet.adapter.name === 'Phantom')
      if (phantomWallet) {
        await phantomWallet.adapter.connect()
      } else {
        // 如果没有找到Phantom，尝试第一个可用钱包
        await wallets[0]?.adapter.connect()
      }
    } catch (error) {
      console.error('连接失败:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('断开连接失败:', error)
    }
  }

  if (!isMounted) {
    return (
      <button 
        disabled
        className="bg-gray-600 text-white border-0 rounded-lg px-6 py-3 font-semibold opacity-50"
      >
        加载中...
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {connected && publicKey && (
        <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      
      <button
        onClick={connected ? handleDisconnect : handleConnect}
        disabled={isConnecting}
        className={`
          bg-gradient-to-r from-yellow-500 to-red-500 text-white border-0 rounded-lg px-6 py-3 font-semibold 
          hover:opacity-90 transition-opacity duration-200
          ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isConnecting ? '连接中...' : connected ? '断开连接' : '连接钱包'}
      </button>
    </div>
  )
}
