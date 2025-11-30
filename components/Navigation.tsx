// components/Navigation.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Web Trigger', href: '/trigger' },
  { name: 'Source Code', href: '/trigger-script' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'Winners', href: '/winners' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { publicKey } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-yellow-400">
                🎰 JACKPOT
              </Link>
            </div>
            
            {/* Desktop Navigation Links */}
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

          {/* Wallet Connection & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Wallet Info */}
            {publicKey && (
              <div className="hidden md:block text-sm text-gray-400">
                {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {publicKey && (
                <div className="text-sm text-gray-400 mr-4">
                  {publicKey.toString().slice(0, 4)}...
                </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
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
                {/* Close icon */}
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

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-gray-900 text-yellow-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile wallet address */}
            {publicKey && (
              <div className="px-3 py-2 text-sm text-gray-400 border-t border-gray-700 mt-2">
                Wallet: {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
