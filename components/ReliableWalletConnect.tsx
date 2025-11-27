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
        Loading Wallet...
      </button>
    )
  }
)

export default function ReliableWalletConnect() {
  const { connected, publicKey, connect } = useWallet()  // 加connect钩子，便于错误处理

  // 可选：包装connect以捕获错误
  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Wallet connection error:', error)
      alert('连接失败！请尝试禁用浏览器翻译功能（如Chrome Google Translate），然后重试。')
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {connected && publicKey && (
        <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">
          已连接: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <div className="notranslate">  {/* 关键：添加notranslate类，防止翻译干扰 */}
        <WalletMultiButton
          onClick={handleConnect}  // 如果需要，自定义点击处理错误
          style={{
            backgroundColor: '#15803d',
            backgroundImage: 'linear-gradient(to right, #111827, #22c55e)',
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
    </div>
  )
}
