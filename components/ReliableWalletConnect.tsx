// components/ReliableWalletConnect.tsx
'use client'
import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'
import { Wallet, CheckCircle, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

// 动态导入官方钱包按钮，确保只在客户端渲染
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="bg-walawow-neutral-card text-walawow-neutral-text-secondary px-6 py-3 rounded-xl font-semibold opacity-70 animate-pulse"
      >
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-walawow-neutral-border"></div>
          Loading Wallet...
        </div>
      </button>
    )
  }
)

export default function ReliableWalletConnect() {
  const { connected, publicKey, connect } = useWallet()
  const [isHovered, setIsHovered] = useState(false)
  const [showSparkle, setShowSparkle] = useState(false)

  // 当连接成功时显示闪烁效果
  useEffect(() => {
    if (connected) {
      setShowSparkle(true)
      const timer = setTimeout(() => setShowSparkle(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [connected])

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error('Wallet connection error:', error)
      // 可以使用更优雅的toast替代alert
      alert('Connection failed! Please disable browser translation (like Chrome Google Translate) and try again.')
    }
  }

  // 自定义按钮内容
  const buttonContent = connected ? (
    <div className="flex items-center gap-2">
      {showSparkle && <Sparkles className="h-4 w-4 text-walawow-gold animate-pulse" />}
      <CheckCircle className="h-4 w-4 text-green-400" />
      <span>Connected</span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Wallet className="h-4 w-4" />
      <span>Connect Wallet</span>
    </div>
  )

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* 连接状态显示 */}
      {connected && publicKey && (
        <div className="glass-card px-4 py-2.5 rounded-xl border border-walawow-neutral-border">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-walawow-gold animate-pulse"></div>
            <div className="text-sm">
              <span className="text-walawow-neutral-text-secondary">Explorer: </span>
              <span className="font-mono text-walawow-gold-light">
                {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 钱包按钮 */}
      <div 
        className="notranslate"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <WalletMultiButton
          onClick={handleConnect}
          style={{
            // 动态渐变背景
            background: connected 
              ? 'linear-gradient(135deg, var(--color-walawow-purple) 0%, var(--color-walawow-purple-dark) 100%)'
              : isHovered
                ? 'linear-gradient(135deg, var(--color-walawow-gold) 0%, var(--color-walawow-gold-dark) 100%)'
                : 'linear-gradient(135deg, var(--color-walawow-purple-light) 0%, var(--color-walawow-purple) 100%)',
            
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: connected 
              ? '0 10px 30px -5px rgba(147, 51, 234, 0.4)' 
              : isHovered
                ? '0 10px 30px -5px rgba(251, 191, 36, 0.4)'
                : '0 5px 15px rgba(147, 51, 234, 0.3)',
            
            // 悬停效果
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          {/* 自定义按钮内容 */}
          {buttonContent}
        </WalletMultiButton>

        {/* 连接提示文字 */}
        {!connected && (
          <div className="mt-2 text-center">
            <p className="text-xs text-walawow-neutral-text-secondary">
              Unlock your <span className="text-walawow-gold">WOW moments</span>
            </p>
          </div>
        )}
      </div>

      {/* 连接后的小提示 */}
      {connected && (
        <div className="text-center animate-float">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-walawow-gold/10 border border-walawow-gold/30">
            <span className="text-xs text-walawow-gold">✨</span>
            <span className="text-xs text-walawow-gold-light">Ready for surprises!</span>
          </div>
        </div>
      )}
    </div>
  )
}
