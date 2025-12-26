// components/Navigation.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Web Trigger', href: '/trigger' },
  { name: 'Winners', href: '/winners' },
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Developer Docs', href: '/trigger-script' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { publicKey } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  return (
    // 主容器：应用毛玻璃效果和品牌紫色边框
    <nav className="glass-card border-b border-walawow-purple/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 左侧Logo和导航链接 */}
          <div className="flex items-center">
            {/* Logo - 应用新的渐变标题样式 */}
            <div className="notranslate flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="title-gradient text-2xl font-bold tracking-tight"
              >
                Walawow
              </Link>
              {/* 可选的徽标点缀 */}
              <span className="ml-2 text-xs font-semibold bg-gradient-to-r from-walawow-purple to-walawow-gold bg-clip-text text-transparent">
                ✨ The Surprise Protocol
              </span>
            </div>
            
            {/* 桌面端导航链接 */}
            <div className="hidden md:ml-10 md:flex md:space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  // 当前页链接使用金色下划线，悬停有效果
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? 'text-walawow-gold border-b-2 border-walawow-gold'
                      : 'text-walawow-neutral-text-secondary hover:text-walawow-purple-light hover:scale-105'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 右侧：钱包信息和移动菜单按钮 */}
          <div className="flex items-center space-x-4">
            {/* 桌面端钱包地址显示 - 更精致的样式 */}
            {publicKey && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-walawow-gold animate-pulse"></div>
                <div className="text-sm font-medium px-3 py-1 rounded-lg bg-walawow-neutral-card border border-walawow-neutral-border">
                  <span className="text-walawow-gold-light">{publicKey.toString().slice(0, 4)}</span>
                  <span className="text-walawow-neutral-text-secondary">...</span>
                  <span className="text-walawow-gold-light">{publicKey.toString().slice(-4)}</span>
                </div>
              </div>
            )}

            {/* 移动端菜单按钮 */}
            <div className="md:hidden flex items-center">
              {publicKey && (
                <div className="text-sm font-medium mr-4 px-2 py-1 rounded bg-walawow-neutral-card/50">
                  <span className="text-walawow-gold">{publicKey.toString().slice(0, 4)}..</span>
                </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-walawow-neutral-text-secondary hover:text-walawow-purple-light hover:bg-walawow-purple/10 focus:outline-none focus:ring-2 focus:ring-walawow-purple-light transition-colors"
                aria-label="Toggle menu"
              >
                {/* 汉堡菜单图标 */}
                <svg
                  className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* 关闭图标 */}
                <svg
                  className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 移动端菜单面板 */}
        <div className={`${isOpen ? 'block animate-float' : 'hidden'} md:hidden mt-2`}>
          <div className="glass-card px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-walawow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-walawow-purple/20 to-walawow-gold/10 text-walawow-gold border-l-4 border-walawow-gold'
                    : 'text-walawow-neutral-text-secondary hover:text-white hover:bg-walawow-purple/10 hover:pl-6'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* 移动端钱包地址显示 */}
            {publicKey && (
              <div className="px-4 py-3 text-sm border-t border-walawow-neutral-border mt-2">
                <div className="data-label">Connected Wallet</div>
                <div className="data-value text-base font-mono break-all">
                  {publicKey.toString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
