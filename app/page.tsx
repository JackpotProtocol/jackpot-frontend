'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import ReliableWalletConnect from '../components/ReliableWalletConnect'
import Dashboard from '../components/Dashboard'
import { Sparkles } from 'lucide-react' // 可选：安装 lucide-react 获得更多图标

export default function Home() {
  const { connected } = useWallet()

  return (
    <main className="min-h-screen">
      {/* 英雄区域 - 华丽的渐变背景和标题 */}
      <section className="relative overflow-hidden rounded-3xl mb-10 p-8 md:p-12">
        {/* 动态背景光斑 */}
        <div className="absolute inset-0 bg-gradient-to-br from-walawow-purple/20 via-transparent to-walawow-gold/10"></div>
        <div className="absolute top-10 right-10 h-72 w-72 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-walawow-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              {/* 主标题 - 应用华丽的渐变 */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <Sparkles className="h-8 w-8 text-walawow-gold animate-pulse" />
                <h1 className="notranslate title-gradient text-4xl md:text-5xl lg:text-6xl font-bold">
                  Walawow Protocol
                </h1>
                <Sparkles className="h-8 w-8 text-walawow-purple-light animate-pulse" />
              </div>
              <p className="text-xl md:text-2xl text-walawow-neutral-text-secondary max-w-2xl">
                Where Every Interaction Holds a{' '}
                <span className="font-semibold text-walawow-gold-light">Surprise</span>. 
                Experience Decentralized Rewards on{' '}
                <span className="font-semibold text-walawow-purple-light">Solana</span>.
              </p>
            </div>
            {/* 钱包连接按钮 */}
            <div className="relative z-50 transform transition-all hover:scale-105">
              <ReliableWalletConnect />
            </div>
          </div>

          {/* 关键数据展示区 - 即使未连接钱包也显示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="glass-card p-6 text-center hover:glow-purple transition-all duration-300">
              <div className="data-label">Total Value Locked</div>
              <div className="data-value flex items-center justify-center gap-2">
                <span className="text-walawow-gold">$</span>
                12.8M
              </div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-2">+5.2% today</div>
            </div>
            <div className="glass-card p-6 text-center hover:glow-purple transition-all duration-300">
              <div className="data-label">Surprises Distributed</div>
              <div className="data-value text-walawow-purple-light">42,069</div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-2">Lifetime WOWs</div>
            </div>
            <div className="glass-card p-6 text-center hover:glow-purple transition-all duration-300">
              <div className="data-label">Biggest WOW</div>
              <div className="data-value flex items-center justify-center gap-2">
                <span className="text-walawow-gold">$</span>
                250,000
              </div>
              <div className="text-xs text-walawow-neutral-text-secondary mt-2">Last week</div>
            </div>
          </div>
        </div>
      </section>

      {/* 主要交互区域 */}
      <section>
        {connected ? (
          <Dashboard />
        ) : (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              {/* 醒目的召唤区域 */}
              <div className="glass-card p-8 md:p-12 rounded-3xl mb-10 border-2 border-dashed border-walawow-purple/30 hover:border-walawow-gold/50 transition-all duration-500">
                <div className="text-8xl mb-6 animate-float">🎁</div>
                <h2 className="section-title text-3xl md:text-4xl !border-0 !pl-0 mb-4">
                  Your <span className="text-walawow-gold">WOW Moment</span> Awaits
                </h2>
                <p className="text-lg text-walawow-neutral-text-secondary mb-10 max-w-md mx-auto">
                  Connect your wallet to unlock access. Discover surprises, participate in draws, 
                  and experience transparent on-chain rewards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="transform transition-all hover:scale-110 active:scale-95">
                    <ReliableWalletConnect />
                  </div>
                  <button className="btn-outline px-8 py-3 text-base">
                    Learn How It Works →
                  </button>
                </div>
              </div>

              {/* 功能亮点展示 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="glass-card p-6 text-left">
                  <div className="h-12 w-12 rounded-full bg-walawow-purple/20 flex items-center justify-center mb-4">
                    <div className="h-6 w-6 text-walawow-purple-light">⚡</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Instant Surprises</h3>
                  <p className="text-sm text-walawow-neutral-text-secondary">
                    No waiting periods. Every transaction could trigger an instant WOW.
                  </p>
                </div>
                <div className="glass-card p-6 text-left">
                  <div className="h-12 w-12 rounded-full bg-walawow-gold/20 flex items-center justify-center mb-4">
                    <div className="h-6 w-6 text-walawow-gold">🛡️</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Fully Transparent</h3>
                  <p className="text-sm text-walawow-neutral-text-secondary">
                    All draws and distributions are verifiable on-chain. Trust through technology.
                  </p>
                </div>
                <div className="glass-card p-6 text-left">
                  <div className="h-12 w-12 rounded-full bg-walawow-purple/20 flex items-center justify-center mb-4">
                    <div className="h-6 w-6 text-walawow-purple-light">🌊</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Community Pool</h3>
                  <p className="text-sm text-walawow-neutral-text-secondary">
                    The more you participate, the bigger the shared surprise pool grows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
