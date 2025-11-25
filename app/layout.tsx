import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientWalletProvider from '../components/ClientWalletProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jackpot Protocol - The Perpetual Wealth Aggregator on Solana',
  description: 'A smart contract-driven on-chain wealth aggregation protocol on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWalletProvider>
          {/* 只修改这一行 - 使用 Tailwind 内置的绿色类 */}
          <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-900">
            {children}
          </div>
        </ClientWalletProvider>
      </body>
    </html>
  )
}
