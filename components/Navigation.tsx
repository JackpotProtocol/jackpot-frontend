// components/Navigation.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'Winners', href: '/winners' },
  { name: 'Source Code', href: '/trigger-script' }, // 新增源代码页面
]

export default function Navigation() {
  const pathname = usePathname()
  const { publicKey } = useWallet()

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-yellow-400">🎰 JACKPOT</span>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center">
            {publicKey && (
              <div className="text-sm text-gray-400 mr-4">
                {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
